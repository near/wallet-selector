import type { QueryResponseKind } from "@near-js/types";
export declare const createQueryResponseMock: () => QueryResponseKind;
export declare const createViewAccessKeyResponseMock: () => {
    nonce: number;
    permission: string;
    block_height: import("@near-js/types").BlockHeight;
    block_hash: import("@near-js/types").BlockHash;
};
//# sourceMappingURL=provider.service.mocks.d.ts.map