import ISenderWallet from "../../interfaces/ISenderWallet";
import InjectedWallet from "../types/InjectedWallet";
import EventHandler from "../../utils/EventHandler";
import { getState, updateState } from "../../state/State";
import { CallV1Params, ViewParams } from "../../interfaces/IWallet";
import { SerializableAction } from "../../interfaces/transactions";

class SenderWallet extends InjectedWallet implements ISenderWallet {
  constructor() {
    super(
      "senderwallet",
      "Sender Wallet",
      "Sender Wallet",
      "https://senderwallet.io/logo.png",
      "wallet"
    );
  }

  async walletSelected() {
    if (!window[this.injectedGlobal]) {
      updateState((prevState) => ({
        ...prevState,
        showWalletOptions: false,
        showSenderWalletNotInstalled: true,
      }));
      return;
    }

    const rpcResponse = await window[this.injectedGlobal].getRpc();
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
    const response = await window[this.injectedGlobal].requestSignIn({
      contractId: state.options.contract.address,
    });
    console.log(response);

    if (response.accessKey) {
      this.setWalletAsSignedIn();
      EventHandler.callEventHandler("signIn");
      updateState((prevState) => ({
        ...prevState,
        showModal: false
      }))
    }
  }

  async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async init(): Promise<void> {
    await this.timeout(200);
    const state = getState();
    window[this.injectedGlobal].onAccountChanged((newAccountId: string) => {
      console.log("newAccountId: ", newAccountId);
    });
    window[this.injectedGlobal]
      .init({ contractId: state.options.contract.address })
      .then((res: any) => {
        console.log(res);
      });
    EventHandler.callEventHandler("init");
  }

  async isConnected(): Promise<boolean> {
    return window[this.injectedGlobal].isSignedIn();
  }

  disconnect() {
    EventHandler.callEventHandler("disconnect");
    return window[this.injectedGlobal].signOut();
  }

  async getAccount() {
    await this.timeout(300);
    return {
      accountId: window[this.injectedGlobal].getAccountId(),
      balance: "99967523358427624000000000",
    };
  }

  transformSerializedActions(actions: Array<SerializableAction>) {
    return actions;
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

  async call({ receiverId, actions }: CallV1Params) {
    const transformedActions = this.transformSerializedActions(actions);

    console.log("SenderWallet:call", { receiverId, actions, transformedActions });

    return window[this.injectedGlobal].signAndSendTransaction({
      receiverId,
      actions: transformedActions,
    });
  }
}

export default SenderWallet;