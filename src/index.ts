import NearWalletSelector from "./core/NearWalletSelector";
import setupNearWallet from "./wallets/browser/nearWalletV2";
import setupSenderWallet from "./wallets/injected/senderWalletV2";
import setupLedgerWallet from "./wallets/hardware/ledgerWalletV2";

export { Options } from "./interfaces/Options";

export {
  WalletModule,
  Wallet,
  WalletType,
  BrowserWallet,
  InjectedWallet,
  HardwareWallet,
  AccountInfo,
} from "./wallets/Wallet";

export const wallets = {
  nearWallet: setupNearWallet,
  senderWallet: setupSenderWallet,
  ledgerWallet: setupLedgerWallet,
};

export { Subscription } from "./utils/EventsHandler";

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

export default NearWalletSelector;
