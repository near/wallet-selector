import { Emitter } from "../../utils/EventsHandler";
import BaseWallet from "../BaseWallet";
import ProviderService from "../../services/provider/ProviderService";
import { Options } from "../../core/NearWalletSelector";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(emitter: Emitter, provider: ProviderService, options: Options) {
    super(emitter, provider, options);
  }
}
