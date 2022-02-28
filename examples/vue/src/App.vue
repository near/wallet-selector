<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import NearWalletSelector from "near-wallet-selector";
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

import getConfig from "./config";
import Content from "./components/Content.vue";

const selector = shallowRef<NearWalletSelector>();
const account = shallowRef<AccountInfo | null>(null);

onMounted(async () => {
  const nearConfig = getConfig("testnet");

  const nearWalletSelector = new NearWalletSelector({
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

  await nearWalletSelector.init();

  selector.value = nearWalletSelector;
});
</script>

<template>
  <h1>NEAR Guest Book</h1>
  <Content v-if="!!selector" :selector="selector" />
</template>
