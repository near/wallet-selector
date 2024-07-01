import { parseAbi } from "viem";

export const ETHEREUM_ACCOUNT_ABI = parseAbi([
  "function functionCall(string receiver_id, string method_name, bytes args, uint64 gas, uint32 yoctoNear) payable",
  "function transfer(string receiver_id, uint32 yoctoNear) payable",
  "function addKey(uint8 public_key_kind, bytes public_key, uint64 nonce, bool is_full_access, bool is_limited_allowance, uint128 allowance, string receiver_id, string[] method_names) external",
  "function deleteKey(uint8 public_key_kind, bytes public_key) external",
]);
export const DEFAULT_ACCESS_KEY_ALLOWANCE = "250000000000000000000000"; // 0.25 NEAR
export const RLP_EXECUTE = "rlp_execute";
export const MAX_TGAS = BigInt(270e12); // Handle overhead of rlp_execute to validate the Ethereum transaction.
export class EthTxError extends Error {}
