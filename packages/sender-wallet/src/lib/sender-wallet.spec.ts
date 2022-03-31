import { setupSenderWallet } from "./sender-wallet";

describe("senderWallet", () => {
  it("should work", () => {
    expect(setupSenderWallet()).toBeDefined();
  });
});
