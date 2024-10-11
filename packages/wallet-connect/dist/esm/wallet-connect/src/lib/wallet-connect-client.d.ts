import type { SignClientTypes, EngineTypes } from "@walletconnect/types";
import type { SessionTypes } from "@walletconnect/types";
import type { EventEmitterService, WalletEvents } from "@near-wallet-selector/core";
declare class WalletConnectClient {
    private client;
    private emitter;
    private modal;
    init(opts: SignClientTypes.Options): Promise<void>;
    constructor(emitter: EventEmitterService<WalletEvents>);
    get session(): import("@walletconnect/types").ISession;
    on<Event extends SignClientTypes.Event>(event: Event, callback: (args: SignClientTypes.EventArguments[Event]) => void): {
        remove: () => import("@walletconnect/types").ISignClientEvents;
    };
    once<Event extends SignClientTypes.Event>(event: Event, callback: (args: SignClientTypes.EventArguments[Event]) => void): void;
    connect(params: EngineTypes.ConnectParams, qrCodeModal: boolean, projectId: string, chainId: string): Promise<SessionTypes.Struct>;
    request<Response>(params: EngineTypes.RequestParams): Promise<Response>;
    disconnect(params: EngineTypes.DisconnectParams): Promise<void>;
}
export default WalletConnectClient;
//# sourceMappingURL=wallet-connect-client.d.ts.map