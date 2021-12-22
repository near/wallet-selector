import Options from "../types/Options";
import Wallets from "../wallets";
import modalHelper from "../modal-helper";

export default class Core {
  private options: Options = {
    wallets: ["nearwallet", "senderwallet", "ledgerwallet", "narwallet"],
    theme: "light",
    customWallets: {},
  };

  public wallets: Wallets;

  constructor(options?: Options) {
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      };
    }

    this.wallets = new Wallets(
      this.options.wallets,
      this.options.customWallets
    );

    modalHelper.createModal(this.options, this.wallets);
  }

  public showModal() {
    modalHelper.showModal();
  }

  public hideModal() {
    modalHelper.hideModal();
  }
}
