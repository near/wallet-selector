<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";
import { utils } from "near-api-js";

import Form from "./Form.vue";
import SignIn from "./SignIn.vue";
import Messages from "./Messages.vue";
import { Message } from "../interfaces";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const props = defineProps<{
  selector: NearWalletSelector;
  initialAccount: AccountInfo | null;
}>()

const account = shallowRef(props.initialAccount);
const messages = ref<Array<Message>>([]);

const handleSignIn = () => {
  props.selector.show();
};

const handleSignOut = () => {
  props.selector.signOut().catch((err) => {
    console.log("Failed to sign out");
    console.error(err);
  });
};

const handleSwitchProvider = () => {
  props.selector.show();
}

const handleSubmit = (e: any) => {
  e.preventDefault();

  const { fieldset, message, donation } = e.target.elements;

  fieldset.disabled = true;

  // TODO: optimistically update page with new message,
  // update blockchain data in background
  // add uuid to each message, so we know which one is already known
  props.selector.contract.signAndSendTransaction({
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
      return props.selector.contract
        .view({ methodName: "getMessages" })
        .then((nextMessages) => {
          messages.value = nextMessages;
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
  // TODO: don't just fetch once; subscribe!
  const newMessages = await props.selector.contract.view({
    methodName: "getMessages"
  })

  messages.value = newMessages;
});
</script>

<template>
  <div v-if="!!initialAccount">
    <button @click="handleSignOut">Log out</button>
    <button @click="handleSwitchProvider">Switch Provider</button>
  </div>
  <div v-else>
    <button @click="handleSignIn">Log in</button>
  </div>
  <Form v-if="!!initialAccount" :account="initialAccount" @submit="handleSubmit" />
  <SignIn v-else />
  <Messages v-if="!!initialAccount" :messages="messages" />
</template>