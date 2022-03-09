import NearWalletSelector from "./core/NearWalletSelector";
import setupNearWallet from "./wallets/browser/NearWallet";
import setupSenderWallet from "./wallets/injected/SenderWallet";
import setupLedgerWallet from "./wallets/hardware/LedgerWallet";

export { Options } from "./interfaces/Options";

export {
  WalletModule,
  WalletOptions,
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
