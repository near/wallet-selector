import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import { getState, updateState } from "../../state/State";
<<<<<<< HEAD
import { Emitter } from "../../utils/EventsHandler";

=======
import { CallParams, ViewParams } from "../../interfaces/IWallet";
import InjectedSenderWallet from "../../interfaces/InjectedSenderWallet";
>>>>>>> 88933653e8377e23c87fe454fc901f24e83ac77c

declare global {
  interface Window {
    wallet: InjectedSenderWallet | undefined;
  }
}

class SenderWallet extends InjectedWallet implements ISenderWallet {
  wallet: InjectedSenderWallet;

  constructor(emitter: Emitter) {
    super(
      emitter,
      "senderwallet",
      "Sender Wallet",
      "Sender Wallet",
      "https://senderwallet.io/logo.png",
      "wallet"
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
    const state = getState();

    if (state.options.networkId !== rpcResponse.rpc.networkId) {
      updateState((prevState) => ({
        ...prevState,
        showWalletOptions: false,
        showSwitchNetwork: true,
      }));
      return;
    }
    await this.init();
    await this.signIn();
  }

  async signIn() {
    const state = getState();
    const { accessKey } = await this.wallet.requestSignIn({
      contractId: state.options.contract.address,
    });

    if (!accessKey) {
      return;
    }

    await this.setWalletAsSignedIn();


    updateState((prevState) => ({
      ...prevState,
      showModal: false
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

    return this.wallet
      .init({ contractId: state.options.contract.address })
      .then((res) => {
        console.log(res);
        EventHandler.callEventHandler("init");
      });
<<<<<<< HEAD
    this.emitter.emit("init");
=======
>>>>>>> 88933653e8377e23c87fe454fc901f24e83ac77c
  }

  async isConnected() {
    return this.wallet.isSignedIn();
  }

  disconnect() {
<<<<<<< HEAD
    this.emitter.emit("disconnect", {});
    return window[this.injectedGlobal].signOut();
=======
    return this.wallet.signOut()
      .then((res) => {
        if (res.result !== "success") {
          throw new Error("Failed to sign out");
        }

        EventHandler.callEventHandler("disconnect");

        return;
      });
>>>>>>> 88933653e8377e23c87fe454fc901f24e83ac77c
  }

  // TODO: Use https://docs.near.org/docs/api/rpc/contracts#view-account.
  async getAccount() {
    await this.timeout(300);
    return {
      accountId: this.wallet.getAccountId(),
      balance: "99967523358427624000000000",
    };
  }

  view({ contractId, methodName, args = {} }: ViewParams) {
    const state = getState();

    console.log("SenderWallet:view", { contractId, methodName, args });

    // Using NEAR connection as unable to get the RPC connection from SenderWallet.
    return state.nearConnection!.connection.provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: methodName,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic"
    })
      // TODO: Assign real interface.
      .then((res: any) => {
        return res.result && res.result.length > 0 && JSON.parse(Buffer.from(res.result).toString());
      });
  }

  async call({ receiverId, actions }: CallParams) {
    console.log("SenderWallet:call", { receiverId, actions });

    return this.wallet.signAndSendTransaction({ receiverId, actions })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        return res;
      });
  }
}

export default SenderWallet;