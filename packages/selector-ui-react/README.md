# @near-wallet-selector/react-selector-ui

This is the `WalletSelectorModal` react component package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/react-selector-ui

# Using NPM.
npm install @near-wallet-selector/react-selector-ui
```

Then use it in your dApp:

```ts
import React, { useEffect, useRef } from "react";
import { WalletSelectorModal } from "@near-wallet-selector/react-selector-ui";

const Example = ({ selector }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    modalRef.current.setSelector(selector);
  }, [selector]);
  
  const showModal = () => {
    modalRef.current.show();
  };

  // Hide modal programmatically
  const hideModal = () => {
    modalRef.current.hide();
  };

  return (
    <div>
      <button onClick={showModal}>Show Modal</button>

      <WalletSelectorModal ref={modalRef} />
    </div>
  );
};

export default Example;
```

## Modal details

Find all `wallet-selector-modal` details [here](../selector-ui/src/components/wallet-selector-modal)


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
