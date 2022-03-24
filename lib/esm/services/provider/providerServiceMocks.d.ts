import { QueryResponseKind } from "near-api-js/lib/providers/provider";
export declare const createQueryResponseMock: () => QueryResponseKind;
export declare const createFunctionCallResponseMock: (data: unknown) => {
    result: number[];
    logs: never[];
    block_height: number;
    block_hash: string;
};
export declare const createViewAccessKeyResponseMock: () => {
    nonce: number;
    permission: string;
    block_height: number;
    block_hash: string;
};
export declare const createViewAccountResponseMock: () => {
    amount: string;
    code_hash: string;
    locked: string;
    storage_paid_at: number;
    storage_usage: number;
    block_height: number;
    block_hash: string;
};
