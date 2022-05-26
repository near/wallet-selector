export type AlertMessageModalRouteParams = {
  message: string;
  onBack: () => void;
};

export type WalletOptionsModalRouteParams = {
  walletId: string;
};

export type DerivationPathModalRouteParams = {
  walletId: string;
};

export type WalletNotInstalledModalRouteParams = {
  walletId: string;
};

export type WalletNetworkChangedModalRouteParams = {
  walletId: string;
};

export type AlertMessageModalRoute = {
  name: "AlertMessage";
  params: AlertMessageModalRouteParams;
};

export type WalletOptionsModalRoute = {
  name: "WalletOptions";
  params: WalletOptionsModalRouteParams;
};

export type DerivationPathModalRoute = {
  name: "DerivationPath";
  params: DerivationPathModalRouteParams;
};

export type WalletNotInstalledModalRoute = {
  name: "WalletNotInstalled";
  params: WalletNotInstalledModalRouteParams;
};

export type WalletNetworkChangedModalRoute = {
  name: "WalletNetworkChanged";
  params: WalletNetworkChangedModalRouteParams;
};

export type ModalRoute =
  | AlertMessageModalRoute
  | WalletOptionsModalRoute
  | DerivationPathModalRoute
  | WalletNotInstalledModalRoute
  | WalletNetworkChangedModalRoute;
