import { Emitter } from "../../utils/EventsHandler";
import BaseWallet from "../BaseWallet";
import ProviderService from "../../services/provider/ProviderService";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(emitter: Emitter, provider: ProviderService) {
    super(emitter, provider);
  }
}
