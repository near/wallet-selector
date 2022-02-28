<script setup lang="ts">
import { onMounted, ref } from "vue";
import NearWalletSelector from "near-wallet-selector";

import getConfig from "./config";
import Content from "./components/Content.vue";

const loaded = ref(false);
const selector = ref(null);
const account = ref(null);

onMounted(async () => {
  const nearConfig = getConfig("testnet");

  const selector = new NearWalletSelector({
    wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
    networkId: "testnet",
    theme: "light",
    contract: {
      accountId: nearConfig.contractName,
    },
    walletSelectorUI: {
      description: "Please select a wallet to connect to this dApp:",
      explanation: [
        "Wallets are used to send, receive, and store digital assets.",
        "There are different types of wallets. They can be an extension",
        "added to your browser, a hardware device plugged into your",
        "computer, web-based, or as an app on your phone.",
      ].join(" "),
    },
  });

  await selector.init();

  selector.value = selector;
  account.value = await selector.getAccount();
  loaded.value = true;
});
</script>

<template>
  <h1>NEAR Guest Book</h1>
  <Content v-if="loaded" :selector="selector" :initial-account="account" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
