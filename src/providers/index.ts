import * as wallets from "./wallets";
import SenderWallet from "./wallets/SenderWallet";

export { wallets };

export const providers = {
  senderwallet: SenderWallet,
};

export const getProvider = (name: any) => {
  return providers[name];
};

export const isUserLoggedIn = (name: any) => {
  const provider = getProvider(name);
  return provider.isLoggedIn();
};
