/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupSender } = require("./sender");
  const { wallet } = await mockWallet<InjectedWallet>(setupSender(), deps);

  return {
    wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { wallet } = await createSenderWallet();

    await wallet.signIn({ contractId: "test.testnet" });

    // expect(window.near.requestSignIn).toHaveBeenCalled();
  });
});
