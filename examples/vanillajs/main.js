import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet(), setupHereWallet()],
});

const modal = setupModal(selector, {
  contractId: "test.testnet",
});

modal.show();
