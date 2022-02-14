import IWallet, {
  AccountInfo,
  CallParams,
  WalletInfo,
} from "../interfaces/IWallet";
import { LOCALSTORAGE_SIGNED_IN_WALLET_KEY } from "../constants";
import { updateState } from "../state/State";
import { Emitter } from "../utils/EventsHandler";
import ProviderService from "../services/provider/ProviderService";

export default abstract class BaseWallet implements IWallet {
  protected emitter: Emitter;
  protected provider: ProviderService;

  protected showWallet = true;

  constructor(emitter: Emitter, provider: ProviderService) {
    this.emitter = emitter;
    this.provider = provider;
  }

  getShowWallet(): boolean {
    return this.showWallet;
  }

  setShowWallet(showWallet: boolean) {
    this.showWallet = showWallet;
  }

  async setWalletAsSignedIn() {
    const { id } = this.getInfo();

    localStorage.setItem(LOCALSTORAGE_SIGNED_IN_WALLET_KEY, id);

    updateState((prevState) => ({
      ...prevState,
      isSignedIn: true,
      signedInWalletId: id,
    }));
  }

  abstract walletSelected(): Promise<void>;
  abstract init(): Promise<void>;
  abstract getInfo(): WalletInfo;
  abstract disconnect(): Promise<void>;
  abstract isConnected(): Promise<boolean>;
  abstract signIn(): Promise<void>;
  abstract getAccount(): Promise<AccountInfo | null>;
  abstract call(params: CallParams): Promise<unknown>;
}
