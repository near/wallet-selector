import Options from "./Options";
import IWallet from "../interfaces/IWallet";
import { Near } from "near-api-js";

interface State {
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
  nearConnection: Near | null;
}

export default State;
