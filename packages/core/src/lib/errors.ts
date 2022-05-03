enum ErrorCodes {}

export class WalletSelectorError extends Error {
  constructor(name: string, message: string) {
    super(message);

    this.name = name;

    Object.setPrototypeOf(this, WalletSelectorError.prototype);
  }
}
