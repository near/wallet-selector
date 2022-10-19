export type { NethParams } from "./lib/neth";

export { setupNeth } from "./lib/neth";
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
} from './lib/neth-lib'