import React from 'react'
import { ethers } from "ethers";
import { createRoot } from "react-dom/client";
import detectEthereumProvider from "@metamask/detect-provider";
import * as nearAPI from "near-api-js";
import { Modal } from "./modal";
import { generateSeedPhrase } from "near-seed-phrase";

// constants

const domain = {
	name: "NETH",
	version: "1",
	// chainId: 1, // aurora
	chainId: 1313161554, // aurora
};
const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
export const METAMASK_URL = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
const {
	Near,
	Account,
	keyStores: { BrowserLocalStorageKeyStore },
} = nearAPI;
const DOMAIN = {
	name: "NETH",
	version: "1",
	// chainId: 1, // aurora
	chainId: 1313161554, // aurora
};
const defaultGas = "200000000000000";
const NETWORK = {
	testnet: {
		FUNDING_ACCOUNT_ID: "neth.testnet",
		MAP_ACCOUNT_ID: "map.neth.testnet",
		ROOT_ACCOUNT_ID: "testnet",
	},
	mainnet: {
		MAP_ACCOUNT_ID: "nethmap.near",
		ROOT_ACCOUNT_ID: "near",
	},
};

let appAccount: any = null;
let appKeyPair: any = null;

// assigned in initConnection

let gas,
	storage,
	near,
	keyStore,
	logger,
	connection,
	networkId,
	contractAccount,
	accountSuffix;

// helpers

const HEADER_OFFSET = "NETH";
const HEADER_PAD = 8;
const RECEIVER_MARKER = "|~-_NETH~-_-~RECEIVER_-~|";
const PREFIX = "|NETH_";
const SUFFIX = "_NETH|";

const pack = (elements) =>
	elements
		.map((el) => {
			const str =
				typeof el === "string"
					? el
					: Object.entries(el)
						.map(
							([k, v]) =>
								`${PREFIX}${k}:${typeof v === "string" ? v : JSON.stringify(v)
								}${SUFFIX}`
						)
						.join("");

			const len = str.length.toString().padStart(HEADER_PAD, "0");

			return HEADER_OFFSET + len + "__" + str;
		})
		.join("");

const ethSignJson = async (signer, json) => {
	const Transaction: Array<any> = [];
	const types = { Transaction };
	Object.entries(json).forEach(([k]) => {
		types.Transaction.push({
			type: "string",
			name: k,
		});
	});
	/// convenience for devs so they can pass in JSON

	/// hoist any functionCall args containing receiver|account in their key to top level receivers
	/// replaces value with marker, contract fills in marker

	if (json.transactions) {
		Object.values(json.transactions).forEach((tx: any, i) => {
			tx.actions.forEach((action) => {
				if (!action.args) {
					return;
				}
				if (Buffer.isBuffer(action.args)) {
					action.args = "0x" + action.args.toString("hex");
					return;
				}
				Object.entries(action.args).forEach(([key, value]) => {
					/// TODO include check on value to determine valid account_id to be replaced

					if (/receiver_id|account_id/g.test(key)) {
						action.args[key] = RECEIVER_MARKER;
						json.receivers.splice(i + 1, 0, value);
					}
				});
			});
		});

		json.transactions = pack(
			json.transactions.map(({ actions }) => pack(actions))
		);
	}
	if (json.receivers) {
		const numReceivers = json.receivers.length.toString();
		json.receivers =
			HEADER_OFFSET +
			json.receivers.join(",").length.toString().padStart(HEADER_PAD, "0") +
			"__" +
			json.receivers.join(",");
		json.receivers =
			json.receivers.substring(0, 4) +
			numReceivers.padStart(3, "0") +
			json.receivers.substring(7);
	}

	const sig = await signer._signTypedData(domain, types, json);

	const args = {
		sig,
		msg: json,
	};
	// logger.log('\nargs\n', JSON.stringify(args, null, 4), '\n');
	return args;
};

export const getKeyPair = async (signer, ethAddress, accountId) => {
	const { sig } = await ethSignJson(signer, {
		WARNING: `Creating key using Ethereum account: ${ethAddress}. This key can control the NEAR account: ${accountId}.`,
		description: `ONLY sign this on apps you trust! This key CAN make ANY transactions on your NEAR account.`,
	});
	const sigHash = ethers.utils.id(sig);
	/// use 32 bytes of entropy from hash of signature to create NEAR keyPair
	return generateSeedPhrase(sigHash.substring(2, 34));
};

const defaultStorage = (prefix = "") => ({
	getItem: (k) => {
		const v = localStorage.getItem(prefix + k);
		if (v?.charAt(0) !== "{") {
			return v;
		}
		try {
			return JSON.parse(v);
		} catch (e) {
			//   logger.log(e);
		}
	},
	setItem: (k, v) =>
		localStorage.setItem(
			prefix + k,
			typeof v === "string" ? v : JSON.stringify(v)
		),
	removeItem: (k) => localStorage.removeItem(prefix + k),
});

const defaultLogger = () => ({
	// eslint-disable-next-line
	log: (args) => console.log(...args),
});

export const getEthereum = async (): Promise<any> => {
	const provider = await detectEthereumProvider();

	if (!provider) {
		return alert("Please install/activate MetaMask and try again.");
	}

	try {
		await window.ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: "0x" + DOMAIN.chainId.toString(16) }],
		});
	} catch (e: any) {
		logger.log(e);
		const code = e?.code || e?.data?.originalError?.code;
		if (code !== 4902) {
			throw e;
		}

		try {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: "0x" + DOMAIN.chainId.toString(16),
						chainName: "Aurora Mainnet",
						nativeCurrency: {
							name: "Ethereum",
							symbol: "ETH",
							decimals: 18,
						},
						blockExplorerUrls: ["https://explorer.mainnet.aurora.dev/"],
						rpcUrls: ["https://mainnet.aurora.dev"],
					},
				],
			});
		} catch (e2) {
			alert(
				'Error adding chain. Please click "Choose Ethereum Account" and add the Aurora Network to continue.'
			);
			throw e2;
		}
	}

	const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
	const accounts = await ethersProvider.listAccounts();
	if (accounts.length === 0) {
		await ethersProvider.send("eth_requestAccounts", []);
	}
	const signer = ethersProvider.getSigner();

	return { signer, ethAddress: await signer.getAddress() };
};

const getNearMap = async (ethAddress) => {
	console.log('getNearMap')
	return contractAccount.viewFunction(
		NETWORK[networkId].MAP_ACCOUNT_ID,
		"get_near",
		{ eth_address: ethAddress }
	);
};

// export methods

export const getNethAccounts = () => {
	if (!appAccount) {
		return []
	}
	return [{
		accountId: appAccount.accountId,
		publicKey: appKeyPair!.publicKey,
	}]
}

export const initConnection = ({
	network,
	gas: _gas = defaultGas,
	logger: _logger = defaultLogger(),
	storage: _storage = defaultStorage(),
}) => {
	gas = _gas;
	logger = _logger;
	storage = _storage;

	keyStore = new BrowserLocalStorageKeyStore();
	near = new Near({
		...network,
		keyStore,
	});
	connection = near.connection;
	networkId = network.networkId;
	contractAccount = new Account(
		connection,
		NETWORK[networkId].ROOT_ACCOUNT_ID
	);
	accountSuffix = "." + NETWORK[networkId].ROOT_ACCOUNT_ID;

	const cover = document.createElement("div");
	cover.style.display = "none";
	cover.style.width = "100%";
	cover.style.height = "100vh";
	cover.style.zIndex = "999999";
	cover.style.position = "fixed";
	cover.style.top = "0";
	cover.style.background = "rgba(0, 0, 0, 0.5)";
	document.body.appendChild(cover);

	return cover;
};

const handleSignIn = (resolve) => (accountId, keyPair) => {
	appKeyPair = keyPair
	appAccount = new Account(connection, accountId)
	keyStore.setKey(networkId, accountId, keyPair.secretKey)
	resolve(getNethAccounts())
}

export const signIn = async () => {
	if (appAccount) {
		alert('already signed in')
		return getNethAccounts()
	}
	const { signer, ethAddress } = await getEthereum();

	alert('Check map contract for NEAR Account matching ' + ethAddress)

	console.log('signIn')

	const accountId = await getNearMap(ethAddress);
	console.log('response', accountId)

	if (accountId) {
		const keyPair = await getKeyPair(signer, ethAddress, accountId);
		return await new Promise((resolve, _) => {
			const handleSignInMethod = handleSignIn(resolve);
			handleSignInMethod(signer, keyPair);
		})
	}

	/// TODO check map and pop new user modal or sign MM transaction to sign in

	return await new Promise((resolve, _) => {
		setTimeout(() => {
			let el: any = document.createElement("div");
			el.id = MODAL_ELEMENT_ID;
			const elExists = document.getElementById(MODAL_ELEMENT_ID)
			if (!elExists) {
				document.body.appendChild(el);
			} else {
				el = elExists
			}
			const root = createRoot(el!);
			root.render(<Modal {...{
				options: {},
				signer,
				accountSuffix,
				ethAddress,
				handleSignIn: handleSignIn(resolve),
			}} />);
		}, 250);
	})
}

export const signOut = async () => {
	if (!appKeyPair) {
		logger.log("already signed out");
		return false
	}
	appKeyPair = null
	appAccount = null
	return true
};

export const isSignedIn = async () => {
	return !!appAccount
};

export const verifyOwner = async ({ message, provider }) => {

	const [account] = getNethAccounts()
	const accountId = account.accountId
  
	if (!account) {
	  throw new Error("Wallet not signed in");
	}
  
	const pubKey = await connection.signer.getPublicKey(
	  accountId,
	  networkId
	);
	const publicKey = Buffer.from(pubKey.data).toString("base64");
	const block = await provider.block({ finality: "final" });
	const blockId = block.header.hash;
  
	const data = {
	  accountId,
	  message,
	  blockId,
	  publicKey,
	  keyType: pubKey.keyType,
	};
	const encoded = JSON.stringify(data);
  
	const signed = await connection.signer.signMessage(
	  new Uint8Array(Buffer.from(encoded)),
	  accountId,
	  networkId
	);
  
	return {
	  ...data,
	  signature: Buffer.from(signed.signature).toString("base64"),
	};
  };
