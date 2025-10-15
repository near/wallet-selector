/**
 * Generate a human-readable random account ID for the user
 * Format: {adjective}-{noun}-{number}.near or {adjective}-{noun}-{number}.testnet
 */
export function generateAccountId(networkId: string): string {
  const adjectives = [
    "happy", "bright", "swift", "calm", "bold", "wise", "kind", "cool",
    "smart", "quick", "brave", "gentle", "strong", "clever", "fresh", "warm"
  ];

  const nouns = [
    "wallet", "account", "user", "holder", "keeper", "saver", "trader", "buyer",
    "owner", "client", "member", "person", "friend", "helper", "worker", "player"
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 10000);

  const suffix = networkId === "mainnet" ? "near" : "testnet";
  return `${randomAdjective}-${randomNoun}-${randomNumber}.${suffix}`;
}

export function isValidAccountId(accountId: string): boolean {
  const pattern = /^[a-z0-9-_.]+\.(near|testnet)$/;
  return pattern.test(accountId);
}

export function formatNearAmount(amount: string): string {
  const yoctoNear = BigInt(amount);
  const near = Number(yoctoNear) / 1e24;
  return near.toFixed(2);
}

export const STORAGE_KEYS = {
  ACCOUNT: "webauthn_wallet_account",
  ACCOUNTS_LIST: "webauthn_wallet_accounts_list",
} as const;

export class WebAuthnWalletError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "WebAuthnWalletError";
  }
}

export const ERROR_CODES = {
  WEBAUTHN_NOT_SUPPORTED: "WEBAUTHN_NOT_SUPPORTED",
  USER_CANCELLED: "USER_CANCELLED",
  RELAYER_ERROR: "RELAYER_ERROR",
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
  INVALID_ACCOUNT_ID: "INVALID_ACCOUNT_ID",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;


