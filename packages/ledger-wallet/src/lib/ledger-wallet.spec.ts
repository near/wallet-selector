import { ledgerWallet } from "./ledger-wallet";

describe("ledgerWallet", () => {
  it("should work", () => {
    expect(ledgerWallet()).toEqual("ledger-wallet");
  });
});
