<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

import Form from "./Form.vue";
import SignIn from "./SignIn.vue";
import Messages from "./Messages.vue";
import { Message } from "../interfaces";

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
  <Form v-if="!!initialAccount" :account="initialAccount" />
  <SignIn v-else />
  <Messages v-if="!!initialAccount" :messages="messages" />
</template>