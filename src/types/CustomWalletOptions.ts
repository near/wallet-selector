import { WalletInfo } from "../interfaces/IWallet";

type CustomWalletOptions = {
  info: WalletInfo;
  onConnectFunction: () => void;
  onDisconnectFunction: () => void;
  isConnectedFunction: () => boolean;
};

export default CustomWalletOptions;
