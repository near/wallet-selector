/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";

const createSenderWallet = async (deps: MockWalletDependencies = {}) => {
  // eslint-disable-next-line no-console
  console.log("asdasdasdasd");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupSender } = require("./sender");
  // eslint-disable-next-line no-console
  console.log("setupWallet", setupSender);
  const { wallet } = await mockWallet<InjectedWallet>(setupSender(), deps);
  // eslint-disable-next-line no-console
  console.log("wallet", wallet);

  return {
    wallet,
  };
};

afterEach(() => {
  jest.resetModules();
});

describe("signIn", () => {
  it("sign into near wallet", async () => {
    // eslint-disable-next-line no-console
    console.log("========================================asdasdasd");
    const { wallet } = await createSenderWallet();

    const res = await wallet.signIn({ contractId: "test.testnet" });

    // eslint-disable-next-line no-console
    console.log("===================", res);

    // expect(window.near.requestSignIn).toHaveBeenCalled();
  });
});
