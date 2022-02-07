import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import { getState, updateState } from "../../state/State";
import { Emitter } from "../../utils/EventsHandler";
import { AccountInfo, CallParams } from "../../interfaces/IWallet";
import InjectedSenderWallet, {
  GetRpcResponse,
  RpcChangedResponse,
} from "../../interfaces/InjectedSenderWallet";
import ProviderService from "../../services/provider/ProviderService";

declare global {
  interface Window {
    wallet: InjectedSenderWallet | undefined;
  }
}

class SenderWallet extends InjectedWallet implements ISenderWallet {
  wallet: InjectedSenderWallet;

  constructor(emitter: Emitter, provider: ProviderService) {
    super(
      emitter,
      provider,
      "senderwallet",
      "Sender Wallet",
      "Sender Wallet",
      "https://senderwallet.io/logo.png"
    );

    this.wallet = window.wallet!;
  }

  async walletSelected() {
    if (!this.wallet) {
      updateState((prevState) => ({
        ...prevState,
        showWalletOptions: false,
        showSenderWalletNotInstalled: true,
      }));
      return;
    }

    const rpcResponse = await this.wallet.getRpc();

    if (!this.networkMatches(rpcResponse)) {
      return;
    }

    await this.init();
    await this.signIn();
  }

  async signIn() {
    const state = getState();
    const { accessKey } = await this.wallet.requestSignIn({
      contractId: state.options.accountId,
    });

    if (!accessKey) {
      return;
    }

    await this.setWalletAsSignedIn();
    this.emitter.emit("signIn");

    this.emitter.emit("signIn");

    updateState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  }

  async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async init(): Promise<void> {
    await this.timeout(200);

    const state = getState();

    this.wallet.onAccountChanged((newAccountId) => {
      console.log("newAccountId: ", newAccountId);
    });

    this.onNetworkChanged();

    return this.wallet
      .init({ contractId: state.options.accountId })
      .then((res) => {
        console.log(res);
      });
  }

  onNetworkChanged() {
    this.wallet.onRpcChanged((response) => {
      this.networkMatches(response);
    });
  }

  networkMatches(response: RpcChangedResponse | GetRpcResponse) {
    const state = getState();
    if (state.options.networkId !== response.rpc.networkId) {
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

  async isConnected() {
    return this.wallet.isSignedIn();
  }

  disconnect() {
    return this.wallet.signOut().then((res) => {
      if (res.result !== "success") {
        throw new Error("Failed to sign out");
      }

      this.emitter.emit("disconnect");

      return;
    });
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

  async call({ receiverId, actions }: CallParams) {
    console.log("SenderWallet:call", { receiverId, actions });

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
