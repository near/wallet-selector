type ModalRouteName =
  | "AlertMessage"
  | "WalletOptions"
  | "DerivationPath"
  | "WalletNotInstalled"
  | "WalletNetworkChanged";

type AlertMessageParams = {
  message: string;
  onBack: () => void;
};

type WalletOptionsParams = {
  walletId: string;
};

type DerivationPathParams = {
  walletId: string;
  description: string;
};

type WalletNotInstalledParams = {
  walletId: string;
};

type WalletNetworkChangedParams = {
  walletId: string;
};

export type ModalRouteParams =
  | AlertMessageParams
  | WalletOptionsParams
  | DerivationPathParams
  | WalletNotInstalledParams
  | WalletNetworkChangedParams;

export type ModalRoute = {
  name: ModalRouteName;
  params?: ModalRouteParams;
};
