<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive
} from "vue";
import NearWalletSelector, { AccountInfo, Subscription } from "near-wallet-selector";
import { utils } from "near-api-js";

import Form from "./Form.vue";
import SignIn from "./SignIn.vue";
import Messages from "./Messages.vue";
import { Message } from "../interfaces";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

interface ContentState {
  account: AccountInfo | null;
  messages: Array<Message>;
}

const { selector } = defineProps<{
  selector: NearWalletSelector;
}>()

const subscriptions: Record<string, Subscription> = {};
const state = reactive<ContentState>({
  account: null,
  messages: []
});

const handleSignIn = () => {
  selector.show();
};

const handleSignOut = () => {
  selector.signOut().catch((err) => {
    console.log("Failed to sign out");
    console.error(err);
  });
};

const handleSwitchProvider = () => {
  selector.show();
}

const handleSubmit = (e: SubmitEvent) => {
  // TODO: Fix the typing so that target.elements exists..
  // @ts-ignore.
  const { fieldset, message, donation } = e.target.elements;

  fieldset.disabled = true;

  // TODO: optimistically update page with new message,
  // update blockchain data in background
  // add uuid to each message, so we know which one is already known
  selector.contract.signAndSendTransaction({
    actions: [{
      type: "FunctionCall",
      params: {
        methodName: "addMessage",
        args: { text: message.value },
        gas: BOATLOAD_OF_GAS,
        deposit: utils.format.parseNearAmount(donation.value || "0")!
      }
    }]
  })
    .catch((err) => {
      alert("Failed to add message");
      console.log("Failed to add message");

      throw err;
    })
    .then(() => {
      return selector.contract
        .view({ methodName: "getMessages" })
        .then((nextMessages) => {
          state.messages = nextMessages;
          message.value = "";
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        })
        .catch((err) => {
          alert("Failed to refresh messages");
          console.log("Failed to refresh messages");

          throw err;
        });
    })
    .catch((err) => {
      console.error(err);

      fieldset.disabled = false;
    });
};

onMounted(async () => {
  subscriptions.signIn = selector.on("signIn", () => {
    console.log("'signIn' event triggered!");

    selector.getAccount()
      .then((account) => {
        console.log("Account", account);
        state.account = account;
      })
      .catch((err) => {
        console.log("Failed to retrieve account info");
        console.error(err);
      });
  });

  subscriptions.signOut = selector.on("signOut", () => {
    console.log("'signOut' event triggered!");
    state.account = null;
  });

  // TODO: don't just fetch once; subscribe!
  const [ messages, account ] = await Promise.all([
    selector.contract.view({ methodName: "getMessages" }),
    selector.getAccount(),
  ]);

  state.messages = messages;
  state.account = account;
});

onUnmounted(() => {
  for (let key in subscriptions) {
    const subscription = subscriptions[key];

    subscription.remove();
  }
});
</script>

<template>
  <template v-if="state.account">
    <div>
      <button @click="handleSignOut">Log out</button>
      <button @click="handleSwitchProvider">Switch Provider</button>
    </div>
    <Form :account="state.account" :onSubmit="handleSubmit" />
    <Messages :messages="state.messages" />
  </template>
  <template v-else>
    <div>
      <button @click="handleSignIn">Log in</button>
    </div>
    <SignIn />
  </template>
</template>