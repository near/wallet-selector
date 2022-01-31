import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import { Emitter } from "../../interfaces/EventsHandler";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: any | void;

  constructor(emitter: Emitter, id: string, name: string, description: string, icon: string) {
    super(emitter, id, name, description, icon);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
