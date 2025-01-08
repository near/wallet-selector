import { providers, utils } from "near-api-js";
import type { WalletSelectorState } from "./store.types";
import { setupWalletSelector } from "./wallet-selector";
import type {
  WalletSelector,
  WalletSelectorParams,
} from "./wallet-selector.types";
import type { FinalExecutionOutcome } from "near-api-js/lib/providers";
import type { Transaction } from "./wallet";
import type {
  AccessKeyList,
  AccessKeyView,
  AccountView,
  CodeResult,
  RpcQueryRequest,
  ViewStateResult,
} from "near-api-js/lib/providers/provider";

type OnAccountChange = (account: string) => void;

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

export class WalletManager {
  public readonly selector: Promise<WalletSelector>;

  constructor(public readonly params: WalletSelectorParams) {
    this.selector = setupWalletSelector(this.params);
  }

  public async subscribeOnAccountChange(
    onAccountChangeFn: OnAccountChange
  ): Promise<void> {
    const selector = await this.selector;

    selector.store.observable.subscribe(async (state: WalletSelectorState) => {
      const signedAccount = state?.accounts.find(
        (account) => account.active
      )?.accountId;

      onAccountChangeFn(signedAccount || "");
    });
  }

  /**
   *
   * @returns {string} empty string if not signed in, otherwise Account ID
   */
  public async getAccountId(): Promise<string> {
    const selector = await this.selector;

    const isSignedIn = selector.isSignedIn();

    if (!isSignedIn) {
      return "";
    }

    return selector.store.getState().accounts[0].accountId;
  }

  public signIn = async (
    contractId: string,
    methodNames?: Array<string>
  ): Promise<void> => {
    const selector = await this.selector;
    const wallet = await selector.wallet();

    await wallet.signIn({
      contractId: contractId,
      methodNames: methodNames,
      // required for hardware wallets
      accounts: [],
    });
  };

  public async signOut(): Promise<void> {
    const selector = await this.selector;
    const wallet = await selector.wallet();

    await wallet.signOut();
  }

  public async viewMethod(contractId: string, method: string, args = {}) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await provider.query<any>(request);

    return JSON.parse(Buffer.from(response.result).toString());
  }

  public async callMethod(
    contractId: string,
    method: string,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT
  ) {
    const selector = await this.selector;
    const wallet = await selector.wallet();

    const outcome = await wallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    return providers.getTransactionLastResult(outcome as FinalExecutionOutcome);
  }

  public async getTransactionResult(
    txHash: string | Uint8Array,
    signerAccountId: string
  ) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const transaction = await provider.txStatus(txHash, signerAccountId);
    return providers.getTransactionLastResult(transaction);
  }

  public signAndSendTransaction = async (transaction: Transaction) => {
    const selector = await this.selector;
    const wallet = await selector.wallet();

    const outcome = await wallet.signAndSendTransaction(transaction);

    if (!outcome) {
      throw new Error(`Transaction wasn't delivered`);
    }

    return providers.getTransactionLastResult(outcome);
  };

  public signAndSendTransactions = async (transactions: Array<Transaction>) => {
    const selector = await this.selector;
    const wallet = await selector.wallet();

    const outcomes = await wallet.signAndSendTransactions({
      transactions: transactions,
    });

    if (!outcomes) {
      throw new Error(`Transactions weren't delivered`);
    }

    return outcomes.map((outcome) =>
      providers.getTransactionLastResult(outcome)
    );
  };

  public async getBalance(accountId: string): Promise<string> {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    };
    const account = await provider.query<AccountView>(request);

    return account.amount || "0";
  }

  public async getFormattedBalance(
    accountId: string,
    fracDigits?: number
  ): Promise<string> {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    };
    const account = await provider.query<AccountView>(request);

    if (!account.amount) {
      return "0";
    }

    return utils.format.formatNearAmount(account.amount, fracDigits);
  }

  public async viewAccessKey(accountId: string, publicKey: string) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "view_access_key",
      account_id: accountId,
      public_key: publicKey,
      finality: "final",
    };
    return await provider.query<AccessKeyView>(request);
  }

  public async viewAccessKeys(accountId: string) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "view_access_key_list",
      account_id: accountId,
      finality: "final",
    };
    return await provider.query<AccessKeyList>(request);
  }

  public async viewState(accountId: string, prefix?: string) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const prefixBase64 = prefix ? Buffer.from(prefix).toString("base64") : "";
    const request: RpcQueryRequest = {
      request_type: "view_state",
      account_id: accountId,
      prefix_base64: prefixBase64,
      finality: "final",
    };
    return await provider.query<ViewStateResult>(request);
  }

  public async viewContractCode(accountId: string) {
    const selector = await this.selector;
    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const request: RpcQueryRequest = {
      request_type: "view_code",
      account_id: accountId,
      finality: "final",
    };
    return await provider.query<CodeResult>(request);
  }
}
