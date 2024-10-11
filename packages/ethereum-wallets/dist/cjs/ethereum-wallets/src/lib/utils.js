"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthTxError = exports.MAX_TGAS = exports.RLP_EXECUTE = exports.DEFAULT_ACCESS_KEY_ALLOWANCE = exports.ETHEREUM_ACCOUNT_ABI = void 0;
const viem_1 = require("viem");
exports.ETHEREUM_ACCOUNT_ABI = (0, viem_1.parseAbi)([
    "function functionCall(string receiver_id, string method_name, bytes args, uint64 gas, uint32 yoctoNear) payable",
    "function transfer(string receiver_id, uint32 yoctoNear) payable",
    "function addKey(uint8 public_key_kind, bytes public_key, uint64 nonce, bool is_full_access, bool is_limited_allowance, uint128 allowance, string receiver_id, string[] method_names) external",
    "function deleteKey(uint8 public_key_kind, bytes public_key) external",
]);
exports.DEFAULT_ACCESS_KEY_ALLOWANCE = "250000000000000000000000"; // 0.25 NEAR
exports.RLP_EXECUTE = "rlp_execute";
exports.MAX_TGAS = BigInt(270e12); // Handle overhead of rlp_execute to validate the Ethereum transaction.
class EthTxError extends Error {
}
exports.EthTxError = EthTxError;
