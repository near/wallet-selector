import getConfig from '../../config';
import { logger } from '../../services/logging.service';
import { storage } from '../../services/persistent-storage.service';
import ProviderService from '../../services/provider/ProviderService';
import { updateState } from '../../state/State';
import EventHandler from '../../utils/EventsHandler';
import setupNearWallet from './NearWallet';

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
    updateState
  });

  return { nearWallet };
}

describe("isAvailable", () => {
  it("returns true", async () => {
    const { nearWallet } = await createNearWallet();
    expect(nearWallet.isAvailable()).toBe(true);
  });
});
