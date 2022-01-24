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
    contract: {
      address: nearConfig.contractName,
      viewMethods: ["getMessages"],
      changeMethods: ["addMessage"],
    },
  });

  // Load in user's account data
  const contract = near.getContract();
  near.on("init", async () => {
    console.log("init");
  });
  let currentUser = await near.getAccount();
  console.log(currentUser);
  return { near, contract, currentUser, nearConfig };
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
