type CustomWalletOptions = {
  name: string;
  description: string;
  icon: string;
  onConnectFunction: () => void;
  onDisconnectFunction: () => void;
  isConnectedFunction: () => boolean;
};

export default CustomWalletOptions;
