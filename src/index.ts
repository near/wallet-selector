import NearWalletSelector from "./core/NearWalletSelector";
import getConfig from "./config";
import { connect, keyStores } from "near-api-js";
import { updateState } from "./state/State";
import Options from "./types/Options";
import { logging } from './utils/Logger';

logging
  .configure({
    minLevels: {
      '': 'info',
      'core': 'warn'
    }
  })
  .registerConsoleLogger()

export default async function init(options?: Options) {
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const nearConnection = await connect({
    keyStore,
    ...nearConfig,
    //@ts-ignore
    headers: {},
  });
  updateState((prevState) => ({
    ...prevState,
    nearConnection,
  }));
  return new NearWalletSelector(options);
}
