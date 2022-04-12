import NearWalletSelector from "./lib/NearWalletSelector";

export { NetworkId, Options } from "./lib/Options";
export { NetworkConfiguration } from "./lib/network";
export { Subscription } from "./lib/services";

export {
  Wallet,
  WalletType,
  WalletModule,
  BrowserWallet,
  InjectedWallet,
  HardwareWallet,
  BridgeWallet,
  AccountInfo,
  Transaction,
  Action,
  ActionType,
  CreateAccountAction,
  DeployContractAction,
  FunctionCallAction,
  TransferAction,
  StakeAction,
  AddKeyAction,
  DeleteKeyAction,
  DeleteAccountAction,
} from "./lib/wallet";

export { transformActions } from "./lib/wallet";
export { waitFor } from "./lib/helpers";

export default NearWalletSelector;
