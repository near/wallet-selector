import Options from "./Options";
import IWallet from "../interfaces/IWallet";
import SmartContract from "../contracts/SmartContract";

type State = {
  options: Options;
  walletProviders: {
    [name: string]: IWallet;
  };
  isSignedIn: boolean;
  signedInWalletId: string | null;
  contract: SmartContract | null;
};

export default State;
