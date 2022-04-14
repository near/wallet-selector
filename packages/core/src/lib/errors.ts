export enum ErrorCodes {
  WalletNotInstalled = "WalletNotInstalled",
}

export type ErrorCode = `${ErrorCodes}`;

export class WalletSelectorError extends Error {
  constructor(name: ErrorCode, message: string) {
    super(message);

    this.name = name;

    Object.setPrototypeOf(this, WalletSelectorError.prototype);
  }
}
