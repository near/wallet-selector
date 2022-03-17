import React, { useState, useEffect, Fragment, useRef } from "react";
import NearWalletSelector from "near-wallet-selector";

import getConfig from "./config";
import Content from "./components/Content";

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const selectorRef = useRef<NearWalletSelector>();

  useEffect(() => {
    const nearConfig = getConfig("testnet");

    const selector = new NearWalletSelector({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet", "math-wallet", "wallet-connect"],
      networkId: nearConfig.networkId,
      contract: { contractId: nearConfig.contractName },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    window.selector = selector;

    selector.init().then(() => {
      selectorRef.current = selector;
      setLoaded(true);
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
