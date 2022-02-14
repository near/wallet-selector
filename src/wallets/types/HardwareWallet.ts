import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";
import ProviderService from "../../services/provider/ProviderService";
import { Options } from "../../core/NearWalletSelector";

export default abstract class HardwareWallet extends BaseWallet {
  constructor(provider: ProviderService, options: Options) {
    super(provider, options);

    this.setShowWallet(!HelperFunctions.isMobile());
  }
}
