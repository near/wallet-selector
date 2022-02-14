import isMobile from "is-mobile";
import { updateState } from "../../state/State";
import InjectedSenderWallet, {
  GetRpcResponse,
  RpcChangedResponse,
} from "../../interfaces/InjectedSenderWallet";
import ProviderService from "../../services/provider/ProviderService";
import { Options } from "../../core/NearWalletSelector";
import { logger } from "../../services/logging.service";
import {
  AccountInfo,
  InjectedWallet,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";

declare global {
  interface Window {
    wallet: InjectedSenderWallet | undefined;
  }
}

class SenderWallet implements InjectedWallet {
  private wallet: InjectedSenderWallet;
  private provider: ProviderService;
  private options: Options;

  id: "sender-wallet";
  type: "injected";
  name: "Sender Wallet";
  description: null;
  iconUrl: "https://senderwallet.io/logo.png";

  constructor({ options, provider }: WalletOptions) {
    this.options = options;
    this.provider = provider;
  }

  isAvailable() {
    if (!this.isInstalled()) {
      return false;
    }

    if (isMobile()) {
      return false;
    }

    return true;
  }

  private isInstalled() {
    return !!window.wallet;
  }

  private async init() {
    await this.timeout(200);

    if (!this.isInstalled()) {
      throw new Error("Wallet not installed");
    }

    this.wallet = window.wallet!;

    this.onAccountChanged();

    this.wallet.onRpcChanged((response) => {
      this.networkMatches(response);
    });

    return this.wallet
      .init({ contractId: this.options.contract.accountId })
      .then((res) => logger.log("SenderWallet:init", res));
  }

  async connect() {
    if (!this.isInstalled()) {
      return updateState((prevState) => ({
        ...prevState,
        showWalletOptions: false,
        showSenderWalletNotInstalled: true,
      }));
    }

    if (!this.wallet) {
      await this.init();
    }

    const rpcResponse = await this.wallet.getRpc();

    if (!this.networkMatches(rpcResponse)) {
      return;
    }

    const { accessKey } = await this.wallet.requestSignIn({
      contractId: this.options.contract.accountId,
    });

    if (!accessKey) {
      throw new Error("Failed to sign in");
    }
  }

  async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  networkMatches(response: RpcChangedResponse | GetRpcResponse) {
    if (this.options.networkId !== response.rpc.networkId) {
      updateState((prevState) => ({
        ...prevState,
        showModal: true,
        showWalletOptions: false,
        showSwitchNetwork: true,
      }));
      return false;
    }
    return true;
  }

  onAccountChanged() {
    this.wallet.onAccountChanged(async (newAccountId) => {
      logger.log("SenderWallet:onAccountChange", newAccountId);

      try {
        await this.disconnect();
        await this.connect();
      } catch (e) {
        logger.log(`Failed to change account ${e.message}`);
      }
    });
  }

  async isConnected() {
    return this.wallet.isSignedIn();
  }

  async disconnect() {
    const res = await this.wallet.signOut();

    if (res.result !== "success") {
      throw new Error("Failed to sign out");
    }
  }

  async getAccount(): Promise<AccountInfo | null> {
    const connected = await this.isConnected();

    if (!connected) {
      return null;
    }

    const accountId = this.wallet.getAccountId();
    const account = await this.provider.viewAccount({ accountId });

    return {
      accountId,
      balance: account.amount,
    };
  }

  async signAndSendTransaction({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) {
    logger.log("SenderWallet:signAndSendTransaction", { receiverId, actions });

    return this.wallet
      .signAndSendTransaction({ receiverId, actions })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        return res;
      });
  }
}

export default SenderWallet;
