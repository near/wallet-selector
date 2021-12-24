import BaseWallet from "../BaseWallet";
import Transport from "@ledgerhq/hw-transport";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: Transport | void;

  constructor(id: string, name: string, description: string, icon: string) {
    super(id, name, description, icon);
  }
}
