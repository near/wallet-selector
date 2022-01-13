# near-walletselector

# How to import package locally

- `npm install`
- `npm run build`
- `npm link`
- Go to folder where you want to import near-walletselector and type: `npm link near-walletselector`
- You can now import near-walletselector in your project for example like this: `import NearWalletSelector from "near-walletselector";`

# How to use

Import like this:

```
import NearWalletSelector from "near-walletselector";
```

Create near wallet instance:

```
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
