<script setup lang="ts">
import { ref } from "vue";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

import Form from "./Form.vue";
import SignIn from "./SignIn.vue";
import Messages from "./Messages.vue";

const props = defineProps<{
  selector: NearWalletSelector;
  initialAccount: AccountInfo | null;
}>()

const account = ref(props.initialAccount);

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

</script>

<template>
  <div v-if="account">
    <button @click="handleSignOut">Log out</button>
    <button @click="handleSwitchProvider">Switch Provider</button>
  </div>
  <div v-else>
    <button @click="handleSignIn">Log in</button>
  </div>
  <Form v-if="account" :account="account" />
  <SignIn v-else />
  <Messages v-if="!!account" />
</template>