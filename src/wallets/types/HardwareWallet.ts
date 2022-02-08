import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../utils/EventsHandler";
import ProviderService from "../../services/provider/ProviderService";
import { Options } from "../../core/NearWalletSelector";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: any | void;

  constructor(emitter: Emitter, provider: ProviderService, options: Options) {
    super(emitter, provider, options);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
