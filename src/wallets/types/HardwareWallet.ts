import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: any | void;

  constructor(id: string, name: string, description: string, icon: string) {
    super(id, name, description, icon);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
