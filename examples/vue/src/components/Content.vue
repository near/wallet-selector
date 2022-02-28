<script setup lang="ts">
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

import Form from "./Form.vue";
import SignIn from "./SignIn.vue";

const props = defineProps<{
  selector: NearWalletSelector;
  initialAccount: AccountInfo | null;
}>()

const signIn = () => {
  props.selector.show();
};

</script>

<template>
  <div v-if="initialAccount">
    <button>Log out</button>
    <button>Switch Provider</button>
  </div>
  <div v-else>
    <button @click="signIn">Log in</button>
  </div>
  <Form v-if="initialAccount" account={account} />
  <SignIn v-else />
</template>