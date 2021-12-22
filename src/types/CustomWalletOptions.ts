type CustomWalletOptions = {
  name: string;
  description: string;
  icon: string;
  onConnectFunction: Function;
  onDisconnectFunction: Function;
  isConnectedFunction: Function;
};

export default CustomWalletOptions;
