import type { KeyPair } from "@near-js/crypto";
import { KeyPairEd25519 } from "@near-js/crypto";
import { baseEncode } from "@near-js/utils";
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

async function deriveKeyPairFromCredentialId(
  credentialId: ArrayBuffer
): Promise<KeyPair> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", credentialId);
  const secretKey = new Uint8Array(hashBuffer);
  const publicKey = ed25519.getPublicKey(secretKey);

  // Create NEAR KeyPair data (64 bytes: 32 secret + 32 public)
  const keyPairData = new Uint8Array(64);
  keyPairData.set(secretKey, 0);
  keyPairData.set(publicKey, 32);

  const keyPair = new KeyPairEd25519(baseEncode(keyPairData));
  return keyPair;
}

export async function createKey(
  username: string,
  storage?: StorageService
): Promise<KeyPair> {
  if (!navigator.credentials || !navigator.credentials.create) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const challenge = generateChallenge();
  const userId = new TextEncoder().encode(username);

  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
    {
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
    const credential = (await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    })) as PublicKeyCredential;

    if (!credential) {
      throw new PasskeyProcessCanceled("Failed to create credential");
    }

    // Derive NEAR keypair from the credential ID
    // This is deterministic - same credential ID = same keypair
    const keyPair = await deriveKeyPairFromCredentialId(credential.rawId);

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

export async function getKeys(username: string): Promise<Array<KeyPair>> {
  if (!navigator.credentials || !navigator.credentials.get) {
    throw new Error("WebAuthn is not supported in this browser");
  }
  const challenge = generateChallenge();
  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge,
    userVerification: "preferred",
    timeout: 90000,
  };

  try {
    const credential = (await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    })) as PublicKeyCredential;

    const response = credential.response as AuthenticatorAssertionResponse;
    const accountId = new TextDecoder().decode(
      response.userHandle as unknown as Uint8Array
    );

    if (username !== accountId) {
      // TODO: Handle account ID mismatch
    }

    if (!credential || !accountId) {
      throw new PasskeyProcessCanceled("Failed to get credential");
    }

    const keyPair = await deriveKeyPairFromCredentialId(credential.rawId);

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

  return (
    window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.() ||
    Promise.resolve(false)
  );
}

export async function isDeviceSupported(): Promise<boolean> {
  try {
    return await isPassKeyAvailable();
  } catch {
    return false;
  }
}
