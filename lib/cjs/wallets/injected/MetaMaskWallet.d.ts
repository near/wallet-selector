import { InjectedWallet, WalletModule } from "../Wallet";
declare global {
    interface Window {
        ethereum: {
            chainId: string;
        };
    }
}
declare function setupMetaMaskWallet(): WalletModule<InjectedWallet>;
export default setupMetaMaskWallet;
