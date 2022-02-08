import IWallet, {
  AccountInfo,
  CallParams,
  WalletInfo,
} from "../interfaces/IWallet";
import ProviderService from "../services/provider/ProviderService";
import { Options } from "../core/NearWalletSelector";

export default abstract class BaseWallet implements IWallet {
  protected provider: ProviderService;
  protected options: Options;

  protected showWallet = true;

  constructor(provider: ProviderService, options: Options) {
    this.provider = provider;
    this.options = options;
  }

  getShowWallet(): boolean {
    return this.showWallet;
  }

  setShowWallet(showWallet: boolean) {
    this.showWallet = showWallet;
  }

  abstract init(): Promise<void>;
  abstract getInfo(): WalletInfo;
  abstract disconnect(): Promise<void>;
  abstract isConnected(): Promise<boolean>;
  abstract signIn(): Promise<void>;
  abstract getAccount(): Promise<AccountInfo | null>;
  abstract call(params: CallParams): Promise<any>;
}
