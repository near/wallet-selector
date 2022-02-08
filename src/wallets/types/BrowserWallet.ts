import BaseWallet from "../BaseWallet";
import ProviderService from "../../services/provider/ProviderService";
import { Options } from "../../core/NearWalletSelector";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(provider: ProviderService, options: Options) {
    super(provider, options);
  }
}
