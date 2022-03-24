import ProviderService from "../services/provider/ProviderService";
import { Wallet } from "../wallets/Wallet";
import { BuiltInWalletId, Options } from "../interfaces/Options";
import { Emitter } from "../utils/EventsHandler";
export interface SignInParams {
    walletId: BuiltInWalletId;
    accountId?: string;
    derivationPath?: string;
}
declare class WalletController {
    private options;
    private provider;
    private emitter;
    private wallets;
    constructor(options: Options, provider: ProviderService, emitter: Emitter);
    private decorateWallets;
    private setupWalletModules;
    init(): Promise<void>;
    getSelectedWallet(): Wallet | null;
    private getWallet;
    getWallets(): Wallet[];
    signIn({ walletId, accountId, derivationPath }: SignInParams): Promise<void>;
    signOut(): Promise<void>;
    isSignedIn(): false | Promise<boolean>;
    getAccount(): Promise<import("../wallets/Wallet").AccountInfo | null>;
}
export default WalletController;
