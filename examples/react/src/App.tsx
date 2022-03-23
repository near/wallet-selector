import React, { useState, useEffect, Fragment, useRef } from "react";
import NearWalletSelector from "near-wallet-selector";

import Content from "./components/Content";

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const selectorRef = useRef<NearWalletSelector>();

  useEffect(() => {
    NearWalletSelector.init({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet"],
      networkId: "testnet",
      contractId: "guest-book.testnet",
    })
      .then((selector) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        window.selector = selector;

        selectorRef.current = selector;
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Fragment>
      <h1>NEAR Guest Book</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Content selector={selectorRef.current!} />
    </Fragment>
  );
};

export default App;
