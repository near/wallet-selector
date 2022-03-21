import getConfig from "../../config";
import { logger } from "../../services/logging.service";
import { storage } from "../../services/persistent-storage.service";
import ProviderService from "../../services/provider/ProviderService";
import { updateState } from "../../state/State";
import EventHandler from "../../utils/EventsHandler";
import setupNearWallet from "./NearWallet";
import { mock } from "jest-mock-extended";
import * as NearApiJs from "near-api-js";

const createNearWallet = async () => {
  const networkId = "testnet";

  const config = getConfig(networkId);

  const nearWallet = setupNearWallet()({
    options: {
      wallets: ["near-wallet", "sender-wallet", "ledger-wallet"],
      networkId: networkId,
      contract: { contractId: "guest-book.testnet" },
    },
    provider: new ProviderService(config.nodeUrl),
    emitter: new EventHandler(),
    logger,
    storage,
    updateState,
  });

  const near = mock<NearApiJs>();

  jest.mock("near-api-js", () => {
    return {
      ...jest.requireActual("near-api-js"),
      connect: jest.fn().mockResolvedValue({}),
    };
  });

  return { nearWallet, near };
};

afterEach(() => {
  jest.resetModules();
});

describe("isAvailable", () => {
  it("returns true", async () => {
    const { nearWallet } = await createNearWallet();
    expect(nearWallet.isAvailable()).toBe(true);
  });
});

describe("init", () => {
  it("connects to near and clears storage", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    // expect(near.connect).toHaveBeenCalled();
    // expect(near.connect).toBeCalledTimes(1);
  });
});

// TODO
describe("signIn", () => {
  it("sign into near wallet", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    nearWallet.signIn();
    // expect(near.signIn).toHaveBeenCalled();
    // expect(near.signIn).toBeCalledTimes(1);
  });
});

// TODO
describe("signOut", () => {
  it("sign out of near wallet", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    nearWallet.signIn();
    // expect(near.signIn).toHaveBeenCalled();
    // expect(near.signIn).toBeCalledTimes(1);
  });
});

// TODO
describe("isSignedIn", () => {
  it("isSignedIn returns true", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    const result = nearWallet.isSignedIn();
    expect(result).toEqual(true);
  });
});

// TODO
describe("getAccount", () => {
  it("returns account object", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    const result = await nearWallet.getAccount();
    expect(result).toEqual({});
  });
});

// TODO
describe("signAndSendTransaction", () => {
  it("signs and seonds transaction", async () => {
    const { nearWallet } = await createNearWallet();
    nearWallet.init();
    const result = await nearWallet.signAndSendTransaction({
      receiverId: "guest-book.testnet",
      actions: [],
    });
    expect(result).toEqual({});
  });
});
