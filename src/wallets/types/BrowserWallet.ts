import { Emitter } from "../../utils/EventsHandler";
import BaseWallet from "../BaseWallet";
import ProviderService from "../../services/ProviderService";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(
    emitter: Emitter,
    provider: ProviderService,
    id: string,
    name: string,
    description: string,
    icon: string
  ) {
    super(emitter, provider, id, name, description, icon);
  }
}
