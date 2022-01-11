import Options from "./Options";
import IWallet from "../interfaces/IWallet";

type State = {
  options: Options;
  walletProviders: {
    [name: string]: IWallet;
  };
  isSignedIn: boolean;
  signedInWalletId: string | null;
};

export default State;
