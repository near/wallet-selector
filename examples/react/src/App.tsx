import "regenerator-runtime/runtime";
import React, { useState, useEffect, Fragment, useRef } from "react";
import NearWalletSelector from "near-wallet-selector";

import getConfig from "./config";
import Content from "./components/Content";

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const selectorRef = useRef<NearWalletSelector>();

  useEffect(() => {
    const nearConfig = getConfig("testnet");

    const nearWalletSelector = new NearWalletSelector({
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
      networkId: nearConfig.networkId,
      contract: { contractId: nearConfig.contractName },
    });

    nearWalletSelector.init().then(() => {
      selectorRef.current = nearWalletSelector;
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
      <Content selector={selectorRef.current!} />
    </Fragment>
  );
};

export default App;
