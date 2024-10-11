export declare const ETHEREUM_ACCOUNT_ABI: readonly [{
    readonly name: "functionCall";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly type: "string";
        readonly name: "receiver_id";
    }, {
        readonly type: "string";
        readonly name: "method_name";
    }, {
        readonly type: "bytes";
        readonly name: "args";
    }, {
        readonly type: "uint64";
        readonly name: "gas";
    }, {
        readonly type: "uint32";
        readonly name: "yoctoNear";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "transfer";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly type: "string";
        readonly name: "receiver_id";
    }, {
        readonly type: "uint32";
        readonly name: "yoctoNear";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "addKey";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "public_key_kind";
    }, {
        readonly type: "bytes";
        readonly name: "public_key";
    }, {
        readonly type: "uint64";
        readonly name: "nonce";
    }, {
        readonly type: "bool";
        readonly name: "is_full_access";
    }, {
        readonly type: "bool";
        readonly name: "is_limited_allowance";
    }, {
        readonly type: "uint128";
        readonly name: "allowance";
    }, {
        readonly type: "string";
        readonly name: "receiver_id";
    }, {
        readonly type: "string[]";
        readonly name: "method_names";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "deleteKey";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "public_key_kind";
    }, {
        readonly type: "bytes";
        readonly name: "public_key";
    }];
    readonly outputs: readonly [];
}];
export declare const DEFAULT_ACCESS_KEY_ALLOWANCE = "250000000000000000000000";
export declare const RLP_EXECUTE = "rlp_execute";
export declare const MAX_TGAS: bigint;
export declare class EthTxError extends Error {
}
//# sourceMappingURL=utils.d.ts.map