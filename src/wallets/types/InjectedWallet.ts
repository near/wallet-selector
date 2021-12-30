import BaseWallet from "../BaseWallet";
import HelperFunctions from "../../utils/HelperFunctions";

export default abstract class InjectedWallet extends BaseWallet {
  protected injectedGlobal: string;

  constructor(id: string, name: string, description: string, icon: string, injectedGlobal: string) {
    super(id, name, description, icon);

    this.injectedGlobal = injectedGlobal;
    this.setShowWallet(!HelperFunctions.isMobile());
  }

  async init(): Promise<void> {
    await this.waitForLoad();
  }

  private async waitForLoad(): Promise<void> {
    return new Promise((resolve) => {
      (window.onload as any) = resolve;
    });
  }
}
