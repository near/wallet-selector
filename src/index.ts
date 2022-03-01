import NearWalletSelector from "./core/NearWalletSelector";

export { Options } from "./core/NearWalletSelector";

export {
  Wallet,
  WalletType,
  BrowserWallet,
  InjectedWallet,
  HardwareWallet,
  AccountInfo,
} from "./wallets/Wallet";

export {
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
} from "./wallets/actions";

export { Transaction } from "./wallets/transactions";

export default NearWalletSelector;
