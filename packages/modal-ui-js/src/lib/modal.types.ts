import type { Wallet } from "@near-wallet-selector/core";
import { ModuleState } from "@near-wallet-selector/core";

export type Theme = "dark" | "light" | "auto";

export interface ModalOptions {
  contractId: string;
  methodNames?: Array<string>;
  theme?: Theme;
  description?: string;
}

export interface WalletSelectorModal {
  show(): void;
  hide(): void;
}

export type AlertMessageModalRouteParams = {
  wallet: Wallet;
};

export type WalletOptionsModalRouteParams = {
  wallet: Wallet;
};

export type DerivationPathModalRouteParams = {
  walletId: string;
};

export type WalletNotInstalledModalRouteParams = {
  module: ModuleState;
};

export type WalletNetworkChangedModalRouteParams = {
  wallet: Wallet;
};

export type WalletConnectingModalRouteParams = {
  wallet: Wallet;
};

export type AlertMessageModalRoute = {
  name: "AlertMessage";
  params?: AlertMessageModalRouteParams;
};

export type WalletOptionsModalRoute = {
  name: "WalletOptions";
  params?: WalletOptionsModalRouteParams;
};

export type DerivationPathModalRoute = {
  name: "DerivationPath";
  params: DerivationPathModalRouteParams;
};

export type WalletNotInstalledModalRoute = {
  name: "WalletNotInstalled";
  params?: WalletNotInstalledModalRouteParams;
};

export type WalletNetworkChangedModalRoute = {
  name: "WalletNetworkChanged";
  params?: WalletNetworkChangedModalRouteParams;
};

export type WalletConnectingModalRoute = {
  name: "WalletConnecting";
  params?: WalletConnectingModalRouteParams;
};

export type ModalRoute =
  | AlertMessageModalRoute
  | WalletOptionsModalRoute
  | DerivationPathModalRoute
  | WalletNotInstalledModalRoute
  | WalletNetworkChangedModalRoute
  | WalletConnectingModalRoute;
