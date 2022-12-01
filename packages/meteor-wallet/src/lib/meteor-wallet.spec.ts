/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type {
  Near,
  WalletConnection,
  ConnectedWalletAccount,
} from "near-api-js";
import { mock } from "jest-mock-extended";

import { mockWallet } from "../../../core/src/lib/testUtils";
import type { MockWalletDependencies } from "../../../core/src/lib/testUtils";
import type { InjectedWallet } from "../../../core/src/lib/wallet";

const createMeteorWallet = async (deps: MockWalletDependencies = {}) => {
  const walletConnection = mock<WalletConnection>();
  const account = mock<ConnectedWalletAccount>();

  jest.mock("near-api-js", () => {
    const module = jest.requireActual("near-api-js");
    return {
      ...module,
      connect: jest.fn().mockResolvedValue({
        ...mock<Near>(),
        keyStore: {},
        headers: {},
        config: {
          networkId: "testnet",
        },
        connection: walletConnection,
      }),
      WalletConnection: jest.fn().mockReturnValue(walletConnection),
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupMeteorWallet } = require("./meteor-wallet");
  const { wallet } = await mockWallet<InjectedWallet>(
    setupMeteorWallet({ network: { networkId: "testnet" } }),
    deps
  );

  return {
    nearApiJs: require("near-api-js"),
    wallet,
    walletConnection,
    account,
  };
};

afterEach(() => {
  jest.resetModules();
});

// TODO: when type of Meteor wallet is fixed, revisit again
// describe("buildImportAccountsUrl", () => {
//   it("returns import url", async () => {
//     const { wallet } = await createMeteorWallet();

//     expect(wallet.buildImportAccountsUrl).toBeDefined();

//     const url =
//       wallet.buildImportAccountsUrl && wallet.buildImportAccountsUrl();

//     expect(url).toEqual(
//       "https://wallet.meteorwallet.app/batch-import?network=testnet#test"
//     );
//   });
// });
