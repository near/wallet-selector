import { WalletMetadata } from "./wallet/wallet.types";

enum ErrorCodes {
  WalletNotInstalled = "WalletNotInstalled",
}

class WalletSelectorError extends Error {
  constructor(name: ErrorCodes, message: string) {
    super(message);

    this.name = name;

    Object.setPrototypeOf(this, WalletSelectorError.prototype);
  }
}

const isError = (err: unknown, code?: ErrorCodes) => {
  if (!(err instanceof WalletSelectorError)) {
    return false;
  }

  return code ? err.name === code : true;
};

export const errors = {
  isWalletNotInstalledError: (err: unknown) => {
    return isError(err, ErrorCodes.WalletNotInstalled);
  },
  createWalletNotInstalledError: (metadata: WalletMetadata) => {
    return new WalletSelectorError(
      ErrorCodes.WalletNotInstalled,
      `${metadata.name} not installed`
    );
  },
};
