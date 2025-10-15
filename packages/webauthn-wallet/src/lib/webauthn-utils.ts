import { KeyPairEd25519 } from "@near-js/crypto";
import { baseEncode } from "@near-js/utils";
import { sha256 } from "@noble/hashes/sha256";
import { ed25519 } from "@noble/curves/ed25519";

interface StorageService {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}

interface StoredCredentialData {
  publicKey: string;
}

export class PasskeyProcessCanceled extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasskeyProcessCanceled";
  }
}

function generateChallenge(): ArrayBuffer {
  return crypto.getRandomValues(new Uint8Array(32)).buffer;
}

/**
 * Derive a NEAR keypair from WebAuthn credential ID
 * This is deterministic - same credentialId always produces the same keypair
 */
function deriveKeyPairFromCredentialId(credentialId: ArrayBuffer): KeyPairEd25519 {
  // Use the credential ID as entropy
  const credentialIdBytes = new Uint8Array(credentialId);

  // Derive NEAR Ed25519 keypair from the credential ID
  const secretKey = sha256(credentialIdBytes);
  const publicKey = ed25519.getPublicKey(secretKey);

  // Create NEAR KeyPair data (64 bytes: 32 secret + 32 public)
  const keyPairData = new Uint8Array(64);
  keyPairData.set(secretKey, 0);
  keyPairData.set(publicKey, 32);

  return new KeyPairEd25519(baseEncode(keyPairData));
}

export async function createKey(username: string, storage?: StorageService): Promise<KeyPairEd25519> {
  if (!navigator.credentials || !navigator.credentials.create) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const challenge = generateChallenge();
  const userId = new TextEncoder().encode(username);

  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: "NEAR Wallet Selector",
      id: window.location.hostname,
    },
    user: {
      id: userId,
      name: username,
      displayName: username,
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "preferred",
      requireResidentKey: true,
    },
    timeout: 90000,
    attestation: "none",
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new PasskeyProcessCanceled("Failed to create credential");
    }

    // Derive NEAR keypair from the credential ID
    // This is deterministic - same credential ID = same keypair
    const keyPair = deriveKeyPairFromCredentialId(credential.rawId);

    // Store only the public key
    if (storage) {
      const storedData: StoredCredentialData = {
        publicKey: keyPair.getPublicKey().toString(),
      };
      await storage.setItem(`webauthn_credential_${username}`, storedData);
    }

    return keyPair;
  } catch (error) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      throw new PasskeyProcessCanceled("User cancelled the operation");
    }
    throw error;
  }
}

export async function getKeys(username: string, storage?: StorageService): Promise<KeyPairEd25519[]> {
  if (!navigator.credentials || !navigator.credentials.get) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const challenge = generateChallenge();

  const storedData = storage
    ? await storage.getItem<StoredCredentialData>(`webauthn_credential_${username}`)
    : null;

  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge,
    userVerification: "preferred",
    timeout: 90000,
  };

  try {
    const credential = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new PasskeyProcessCanceled("Failed to get credential");
    }

    if (!storedData) {
      throw new Error("No stored credential data found for this username");
    }

    // WebAuthn authentication succeeded, derive the keypair from credential ID
    // This produces the same keypair that was created during registration
    const keyPair = deriveKeyPairFromCredentialId(credential.rawId);

    // Verify the public key matches what we stored
    if (keyPair.getPublicKey().toString() !== storedData.publicKey) {
      throw new Error("Public key mismatch - keypair derivation failed");
    }

    return [keyPair];
  } catch (error) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      throw new PasskeyProcessCanceled("User cancelled the operation");
    }
    throw error;
  }
}

export function isPassKeyAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) {
    return Promise.resolve(false);
  }

  return window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.() || Promise.resolve(false);
}

export async function isDeviceSupported(): Promise<boolean> {
  try {
    return await isPassKeyAvailable();
  } catch {
    return false;
  }
}
