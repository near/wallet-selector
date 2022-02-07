import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../utils/EventsHandler";
import ProviderService from "../../services/provider/ProviderService";

export default abstract class InjectedWallet extends BaseWallet {
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
