# NEAR Wallet Selector

The NEAR Wallet Selector is a package you can use to integrate various types of wallets into your dApp. Users are presented with a modal that allows them to switch between supported wallets such as:

- [NEAR Wallet](https://wallet.near.org/) - Web wallet.
- [Sender](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) - Browser extension wallet.
- [Ledger](https://www.ledger.com/) - Hardware wallet.

## Installation and Usage

The easiest way to use `near-walletselector` is to install it from NPM:

```
npm install near-walletselector
```

Then use it in your dApp:

```
import NearWalletSelector from "near-walletselector";

const near = new NearWalletSelector({
  wallets: ["nearwallet", "senderwallet", "ledgerwallet"],
  networkId: "testnet",
  theme: "light",
  contract: {
    address: "gent.testnet",
    viewMethods: ["getMessages"],
    changeMethods: [],
  },
  walletSelectorUI: {
    description: "Please select a wallet to connect to this dapp:",
    explanation: `Wallets are used to send, receive, and store digital assets. There are different types of wallets. 
                  They can be an extension added to your browser, a hardware device plugged into your computer, 
                  web-based, or as an app on your phone.`,
  }
});
```

## API Reference

Show modal:

```
near.showModal();
```

Hide modal:

```
near.hideModal();
```

Is signed in:

```
near.isSignedIn();
```

Sign out:

```
near.signOut();
```

Add event listeners (init, disconnect, signIn):

```
near.on("init", () => {
   // your code
});
```

Interact with smart contract:

```
near.getContract().callContract("getMessages", []).then(messages => {
  console.log(messages);
});
```

## Example Integration

A variation of the [guest-book](https://github.com/near-examples/guest-book/)  example project can be found in the `example` directory. You can use this to gain a concrete understanding of how to integrate this package into your own dApp.

Contributors to this package may also find this integration useful as it provides a quick and consistent way of manually testing new changes and/or bugs.