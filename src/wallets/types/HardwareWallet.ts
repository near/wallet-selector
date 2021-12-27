import BaseWallet from "../BaseWallet";

export default abstract class HardwareWallet extends BaseWallet {
  protected transport: any | void;

  constructor(id: string, name: string, description: string, icon: string) {
    super(id, name, description, icon);
  }
}
