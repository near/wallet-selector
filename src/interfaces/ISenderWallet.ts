import IWallet from "./IWallet";

type ISenderWallet = Record<string, unknown> & IWallet;
export default ISenderWallet;
