import { SignInParams } from "../controllers/WalletController";
import Contract from "./Contract";
import { EventList } from "../utils/EventsHandler";
import { Options } from "../interfaces/Options";
export default class NearWalletSelector {
    private options;
    private emitter;
    private controller;
    contract: Contract;
    constructor(options: Options);
    private renderModal;
    init(): Promise<void>;
    show(): void;
    hide(): void;
    signIn(params: SignInParams): Promise<void>;
    signOut(): Promise<void>;
    isSignedIn(): false | Promise<boolean>;
    getAccount(): Promise<import("..").AccountInfo | null>;
    on(event: EventList, callback: () => void): import("../utils/EventsHandler").Subscription;
    off(event: EventList, callback: () => void): void;
}
