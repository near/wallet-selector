import NearWalletSelector from "./core/NearWalletSelector";
import getConfig from "./config";
import { connect, keyStores } from "near-api-js";
import { updateState } from "./state/State";
import Options from "./types/Options";

export default async function init(options: Options) {
  const nearConfig = getConfig(options.networkId);
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const nearConnection = await connect({
    keyStore,
    ...nearConfig,
    headers: {},
  });
  updateState((prevState) => ({
    ...prevState,
    nearConnection,
  }));
  return new NearWalletSelector(options);
}
