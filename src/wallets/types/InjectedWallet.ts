import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../utils/EventsHandler";

export default abstract class InjectedWallet extends BaseWallet {
  protected injectedGlobal: string;

  constructor(
    emitter: Emitter,
    id: string,
    name: string,
    description: string,
    icon: string,
    injectedGlobal: string
  ) {
    super(emitter, id, name, description, icon);

    this.injectedGlobal = injectedGlobal;
    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
