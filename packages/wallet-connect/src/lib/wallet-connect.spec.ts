import { walletConnect } from "./wallet-connect";

describe("walletConnect", () => {
  it("should work", () => {
    expect(walletConnect()).toEqual("wallet-connect");
  });
});
