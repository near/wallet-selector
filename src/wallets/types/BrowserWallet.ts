import { Emitter } from "../../utils/EventsHandler";
import BaseWallet from "../BaseWallet";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(emitter: Emitter, id: string, name: string, description: string, icon: string) {
    super(emitter, id, name, description, icon);
  }
}
