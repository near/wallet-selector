<script setup lang="ts">
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

const props = defineProps<{
  selector: NearWalletSelector;
  initialAccount: AccountInfo | null;
}>()

console.log(props.initialAccount);
console.log(props.selector);
</script>

<template>
  <div v-if="initialAccount">
    <button>Log out</button>
    <button>Switch Provider</button>
  </div>
  <div v-else>
    <button>Log in</button>
  </div>
</template>

<style scoped>
</style>
