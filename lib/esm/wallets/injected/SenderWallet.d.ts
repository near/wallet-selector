import InjectedSenderWallet from "./InjectedSenderWallet";
import { InjectedWallet, WalletModule } from "../Wallet";
declare global {
    interface Window {
        near: InjectedSenderWallet | undefined;
    }
}
declare function setupSenderWallet(): WalletModule<InjectedWallet>;
export default setupSenderWallet;
