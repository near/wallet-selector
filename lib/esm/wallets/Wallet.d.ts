import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Options } from "../interfaces/Options";
import ProviderService from "../services/provider/ProviderService";
import { updateState } from "../state/State";
import { Emitter } from "../utils/EventsHandler";
import { Action } from "./actions";
import { Logger } from "../services/logging.service";
import { PersistentStorage } from "../services/persistent-storage.service";
export interface HardwareWalletSignInParams {
    accountId: string;
    derivationPath: string;
}
export interface SignAndSendTransactionParams {
    receiverId: string;
    actions: Array<Action>;
}
export interface AccountInfo {
    accountId: string;
    balance: string;
}
interface BaseWallet {
    id: string;
    name: string;
    description: string | null;
    iconUrl: string;
    type: string;
    init(): Promise<void>;
    isAvailable(): boolean;
    signIn(params?: object): Promise<void>;
    signOut(): Promise<void>;
    isSignedIn(): Promise<boolean>;
    getAccount(): Promise<AccountInfo | null>;
    signAndSendTransaction(params: SignAndSendTransactionParams): Promise<FinalExecutionOutcome>;
}
export interface BrowserWallet extends BaseWallet {
    type: "browser";
}
export interface InjectedWallet extends BaseWallet {
    type: "injected";
}
export interface HardwareWallet extends BaseWallet {
    type: "hardware";
    signIn(params: HardwareWalletSignInParams): Promise<void>;
}
export declare type Wallet = BrowserWallet | InjectedWallet | HardwareWallet;
export declare type WalletType = Wallet["type"];
export interface WalletOptions {
    options: Options;
    provider: ProviderService;
    emitter: Emitter;
    logger: Logger;
    storage: PersistentStorage;
    updateState: typeof updateState;
}
export declare type WalletModule<WalletVariation extends Wallet = Wallet> = (options: WalletOptions) => WalletVariation;
export {};
