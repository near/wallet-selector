import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getConfig from "./config.js";
import NearWalletSelector from "near-walletselector";

// Initializing contract
async function initContract() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");

  const near = await NearWalletSelector({
    wallets: ["nearwallet", "senderwallet", "ledgerwallet"],
    networkId: "testnet",
    theme: "light",
    accountId: nearConfig.contractName,
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

  // Load in user's account data
  near.on("init", async () => {
    console.log("init");
  });

  let currentUser = await near.getAccount();
  console.log(currentUser);

  return {
    near,
    contract: near.contract,
    currentUser,
    nearConfig
  };
}

window.onload = () => {
  window.nearInitPromise = initContract().then(
    ({ near, contract, currentUser }) => {
      ReactDOM.render(
        <App near={near} contract={contract} currentUser2={currentUser} />,
        document.getElementById("root")
      );
    }
  );
};
