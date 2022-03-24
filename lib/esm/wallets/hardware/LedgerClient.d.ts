/// <reference types="node" />
import { Log } from "@ledgerhq/logs";
export declare const CLA = 128;
export declare const INS_SIGN = 2;
export declare const INS_GET_PUBLIC_KEY = 4;
export declare const INS_GET_APP_VERSION = 6;
export declare const P1_LAST = 128;
export declare const P1_MORE = 0;
export declare const P1_IGNORE = 0;
export declare const P2_IGNORE = 0;
export declare function parseDerivationPath(derivationPath: string): Buffer;
export declare const networkId: number;
interface GetPublicKeyParams {
    derivationPath: string;
}
interface SignParams {
    data: Uint8Array;
    derivationPath: string;
}
interface EventMap {
    disconnect: Error;
}
export interface Subscription {
    remove: () => void;
}
declare class LedgerClient {
    private transport;
    static isSupported: () => boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    listen: (callback: (data: Log) => void) => {
        remove: () => void;
    };
    setScrambleKey: (key: string) => void;
    on: <Event_1 extends "disconnect">(event: Event_1, callback: (data: EventMap[Event_1]) => void) => Subscription;
    off: (event: keyof EventMap, callback: () => void) => void;
    getVersion: () => Promise<string>;
    getPublicKey: ({ derivationPath }: GetPublicKeyParams) => Promise<string>;
    sign: ({ data, derivationPath }: SignParams) => Promise<Buffer>;
}
export default LedgerClient;
