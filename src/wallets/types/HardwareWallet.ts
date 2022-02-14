import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../utils/EventsHandler";
import ProviderService from "../../services/provider/ProviderService";

export default abstract class HardwareWallet extends BaseWallet {
  constructor(emitter: Emitter, provider: ProviderService) {
    super(emitter, provider);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
