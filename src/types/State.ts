import Options from "./Options";
import IWallet from "../interfaces/IWallet";
import { Near } from "near-api-js";

type State = {
  showModal: boolean;
  showWalletOptions: boolean;
  showLedgerDerivationPath: boolean;
  showSenderWalletNotInstalled: boolean;
  options: Options;
  walletProviders: {
    [name: string]: IWallet;
  };
  isSignedIn: boolean;
  signedInWalletId: string | null;
  nearConnection: Near | null;
};

export default State;
