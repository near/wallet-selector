import Options from "./Options";
import IWallet from "../interfaces/IWallet";

type State = {
  showModal: boolean;
  showWalletOptions: boolean;
  showLedgerDerivationPath: boolean;
  showSenderWalletNotInstalled: boolean;
  showSwitchNetwork: boolean;
  options: Options;
  walletProviders: {
    [name: string]: IWallet;
  };
  isSignedIn: boolean;
  signedInWalletId: string | null;
};

export default State;
