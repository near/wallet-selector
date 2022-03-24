import React, { Fragment } from "react";

import Content from "./components/Content";
import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";

const App: React.FC = () => {
<<<<<<< HEAD
	const [loaded, setLoaded] = useState(false);
	const selectorRef = useRef<NearWalletSelector>();

	useEffect(() => {
		const nearConfig = getConfig("testnet");

		const selector = new NearWalletSelector({
			wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
			networkId: nearConfig.networkId,
			contract: {
				contractId: nearConfig.contractName,
			},
		});

		// @ts-ignore
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
			<Content selector={selectorRef.current!} />
		</Fragment>
	);
=======
  return (
    <Fragment>
      <h1>NEAR Guest Book</h1>
      <WalletSelectorContextProvider>
        <Content />
      </WalletSelectorContextProvider>
    </Fragment>
  );
>>>>>>> upstream/dev
};

export default App;
