import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../utils/EventsHandler";
import ProviderService from "../../services/provider/ProviderService";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: any | void;

  constructor(
    emitter: Emitter,
    provider: ProviderService,
    id: string,
    name: string,
    description: string,
    icon: string
  ) {
    super(emitter, provider, id, name, description, icon);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
