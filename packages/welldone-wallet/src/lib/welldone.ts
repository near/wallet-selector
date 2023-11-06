import type { Signer } from "near-api-js";
import * as nearAPI from "near-api-js";
import type {
  WalletModuleFactory,
  InjectedWallet,
  WalletBehaviourFactory,
  FinalExecutionOutcome,
  JsonStorageService,
  Optional,
  Transaction,
  Account,
  SignMessageParams,
  SignedMessage,
} from "@near-wallet-selector/core";
import {
  isCurrentBrowserSupported,
  serializeNep413,
  waitFor,
} from "@near-wallet-selector/core";
import type {
  ViewAccessKeyParams,
  WalletProvider,
  WelldoneWalletParams,
  WelldoneWalletState,
} from "./injected-welldone";
import icon from "./icon";
import { signTransactions } from "@near-wallet-selector/wallet-utils";
import isMobile from "is-mobile";

export const STORAGE_ACCOUNT = "account";

declare global {
  interface Window {
    dapp: WalletProvider | undefined;
  }
}

const isInstalled = () => {
  return waitFor(() => !!window.dapp).catch(() => false);
};

async function setupWalletState(
  storage: JsonStorageService
): Promise<WelldoneWalletState> {
  const account = await storage.getItem<ViewAccessKeyParams>(STORAGE_ACCOUNT);
  if (window.dapp) {
    const wallet = window.dapp;
    return {
      wallet,
      account: account ? account : undefined,
    };
  }
  return {};
}

const WelldoneWallet: WalletBehaviourFactory<InjectedWallet> = async ({
  options,
  store,
  emitter,
  logger,
  storage,
  provider,
}) => {
  const _state = await setupWalletState(storage);

  const _getAccounts = async () => {
    if (_state.wallet) {
      const res = await _state.wallet.request("near", {
        method: "dapp:accounts",
      });
      return res["near"] ? [res["near"].address, res["near"].pubKey] : [];
    }
    return [];
  };

  const _validateAccessKey = async ({
    accountId,
    publicKey,
  }: ViewAccessKeyParams) => {
    logger.log("validateAccessKey", { accountId, publicKey });
    if (!_state.wallet) {
      throw new Error("Wallet is not installed");
    }
    const accessKey = await _state.wallet.request("near", {
      method: "query",
      params: {
        request_type: "view_access_key",
        finality: "final",
        account_id: accountId,
        public_key: publicKey,
      },
    });

    logger.log("validateAccessKey:accessKey", { accessKey });

    if (accessKey.permission !== "FullAccess") {
      throw new Error("Public key requires 'FullAccess' permission");
    }

    return accessKey;
  };

  const cleanup = () => {
    if (_state.account) {
      storage.removeItem(STORAGE_ACCOUNT);
      delete _state.account;
    }
  };

  const getAccounts = (): Array<Account> => {
    return _state.account
      ? [
          {
            accountId: _state.account.accountId,
            publicKey: _state.account.publicKey,
          },
        ]
      : [];
  };

  const signOut = async () => {
    cleanup();
    emitter.emit("signedOut", null);
  };

  const setupEvents = () => {
    if (_state.wallet) {
      _state.wallet.on("dapp:accountsChanged", async (newAccountId) => {
        logger.log("onAccountChange", newAccountId);
        await signOut();
      });

      _state.wallet.on("dapp:chainChanged", async (rpc) => {
        logger.log("onNetworkChange", rpc);

        const networkId = rpc.split(":")[1] === "near" ? "mainnet" : "testnet";

        if (options.network.networkId !== networkId) {
          await signOut();

          emitter.emit("networkChanged", { networkId: networkId });
        }
      });
    }
  };

  const signer: Signer = {
    createKey: () => {
      throw new Error("Not implemented");
    },
    getPublicKey: async (accountId) => {
      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find public key for account");
      }

      return nearAPI.utils.PublicKey.from(account.publicKey!);
    },
    signMessage: async (message, accountId) => {
      if (!_state.wallet) {
        throw new Error("Wallet is not installed");
      }

      const accounts = getAccounts();
      const account = accounts.find((a) => a.accountId === accountId);

      if (!account) {
        throw new Error("Failed to find account for signing");
      }

      try {
        const tx = nearAPI.transactions.Transaction.decode(
          Buffer.from(message)
        );
        const serializedTx = Buffer.from(tx.encode()).toString("hex");
        const signed = await _state.wallet.request("near", {
          method: "dapp:signTransaction",
          params: ["0x" + serializedTx],
        });

        return {
          signature: Buffer.from(signed[0].signature.substr(2), "hex"),
          publicKey: nearAPI.utils.PublicKey.from(signed[0].publicKey),
        };
      } catch (err) {
        const signed = await _state.wallet.request("near", {
          method: "dapp:signMessage",
          params: ["0x" + Buffer.from(message).toString("hex")],
        });

        return {
          signature: Buffer.from(signed[0].signature.substr(2), "hex"),
          publicKey: nearAPI.utils.PublicKey.from(signed[0].publicKey),
        };
      }
    },
  };

  const transformTransactions = (
    transactions: Array<Optional<Transaction, "signerId" | "receiverId">>
  ): Array<Transaction> => {
    const accounts = getAccounts();
    const { contract } = store.getState();

    if (!accounts.length || !contract) {
      throw new Error("Wallet not signed in");
    }

    return transactions.map((transaction) => {
      return {
        signerId: transaction.signerId || accounts[0].accountId,
        receiverId: transaction.receiverId || contract.contractId,
        actions: transaction.actions,
      };
    });
  };

  return {
    async signIn() {
      const existingAccounts = getAccounts();

      if (existingAccounts.length) {
        return existingAccounts;
      }

      if (_state.account) {
        await signOut();
      }

      const account = await _getAccounts();

      const accessKey = await _validateAccessKey({
        accountId: account[0],
        publicKey: account[1],
      });

      if (!accessKey) {
        signOut();
        throw new Error(
          `Public key (${account[1]}) is not registered with the account '${account[0]}'.`
        );
      }

      await storage.setItem(STORAGE_ACCOUNT, {
        accountId: account[0],
        publicKey: account[1],
      });

      _state.account = {
        accountId: account[0],
        publicKey: account[1],
      };

      setupEvents();

      return getAccounts();
    },

    async getAccounts() {
      return getAccounts();
    },

    signOut,

    async verifyOwner({ message }) {
      logger.log("verifyOwner", { message });

      if (!_state.wallet) {
        throw new Error("Wallet is not installed");
      }

      const account = _state.account;

      if (!account) {
        throw new Error("Wallet not signed in");
      }

      const accountId = account.accountId;
      const pubKey = nearAPI.utils.PublicKey.fromString(account.publicKey);
      const block = await provider.block({ finality: "final" });

      const data = {
        accountId,
        message,
        blockId: block.header.hash,
        publicKey: Buffer.from(pubKey.data).toString("base64"),
        keyType: pubKey.keyType,
      };
      const encoded = JSON.stringify(data);

      const signed = await signer.signMessage(
        new Uint8Array(Buffer.from(encoded)),
        accountId
      );

      return {
        ...data,
        signature: Buffer.from(signed.signature).toString("base64"),
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signMessage(message: SignMessageParams): Promise<SignedMessage> {
      if (!_state.wallet) {
        throw new Error("Wallet is not installed");
      }

      const account = await _getAccounts();
      const accountId = account[0];

      if (!accountId) {
        throw new Error("Failed to find account for signing");
      }

      const serializedTx = serializeNep413(message);
      const signed = await _state.wallet.request("near", {
        method: "dapp:signMessage",
        params: ["0x" + serializedTx.toString("hex")],
      });

      const result = {
        accountId,
        publicKey: signed[0].publicKey,
        signature: Buffer.from(signed[0].signature.substr(2), "hex").toString(
          "base64"
        ),
      };

      if (message.state) {
        return { ...result, state: message.state };
      }

      return result;
    },

    async signAndSendTransaction({ signerId, receiverId, actions }) {
      logger.log("signAndSendTransaction", { signerId, receiverId, actions });

      const { contract } = store.getState();
      const accounts = getAccounts();

      if (!accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      const [signedTx] = await signTransactions(
        transformTransactions([{ signerId, receiverId, actions }]),
        signer,
        options.network
      );

      return provider.sendTransaction(signedTx);
    },

    async signAndSendTransactions({ transactions }) {
      logger.log("signAndSendTransactions", { transactions });

      const signedTxs = await signTransactions(
        transformTransactions(transactions),
        signer,
        options.network
      );

      const results: Array<FinalExecutionOutcome> = [];

      for (let i = 0; i < signedTxs.length; i++) {
        results.push(await provider.sendTransaction(signedTxs[i]));
      }

      return results;
    },

    async importAccountsInSecureContext({ accounts }) {
      if (!_state.wallet) {
        throw new Error("Wallet is not installed");
      }
      const privateKeys: Array<string> = [];
      // use batch import
      accounts.forEach(({ privateKey }) => {
        if (privateKey.slice(0, 8) === "ed25519:") {
          privateKeys.push(privateKey.slice(8));
        } else {
          privateKeys.push(privateKey);
        }
      });
      const params = {
        privateKey: privateKeys,
        network: options.network.networkId,
      };
      await _state.wallet.request("near", {
        method: "experimental:near:importPrivatekey",
        params: [params],
      });
    },
  };
};

export function setupWelldoneWallet({
  iconUrl = icon,
  deprecated = false,
}: WelldoneWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async () => {
    const mobile = isMobile();
    const isSupported = isCurrentBrowserSupported([
      "chrome",
      "edge-chromium",
      "opera",
    ]);

    if (mobile || !isSupported) {
      return null;
    }

    const installed = await isInstalled();

    return {
      id: "welldone-wallet",
      type: "injected",
      metadata: {
        name: "WELLDONE Wallet",
        description: "WELLDONE Wallet for Multichains",
        iconUrl,
        downloadUrl:
          "https://chrome.google.com/webstore/detail/welldone-wallet/bmkakpenjmcpfhhjadflneinmhboecjf",
        deprecated,
        available: installed,
      },
      init: WelldoneWallet,
    };
  };
}
