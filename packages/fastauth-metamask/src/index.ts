export type { FastAuthMetaMaskParams } from "./lib/fastauth-metamask";

export { setupFastAuthMetaMask } from "./lib/fastauth-metamask";
export {
  getNear,
  getConnection,
  getEthereum,
  handleCreate,
  accountExists,
  switchEthereum,
  handleCheckAccount,
  handleCancelFunding,
  verifyOwner,
  getNearMap,
  handleDisconnect,
  handleUpdateContract,
  handleRefreshAppKey,
  hasAppKey,
  signIn,
  signOut,
  isSignedIn,
  signAndSendTransactions,
  initConnection,
  MIN_NEW_ACCOUNT_ASK,
} from "./lib/neth-lib";
