import BaseWallet from "../BaseWallet";

export default abstract class BrowserWallet extends BaseWallet {
  constructor(id: string, name: string, description: string, icon: string) {
    super(id, name, description, icon);
  }
}
