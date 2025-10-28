# @near-wallet-selector/webauthn-wallet

WebAuthn biometric wallet module for NEAR Wallet Selector - Sign in with your fingerprint, face, or device PIN

## Example usage

```typescript
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWebAuthnWallet } from "@near-wallet-selector/webauthn-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupWebAuthnWallet({
      relayerUrl: "https://your-app.com/api/relayer"
    })
  ]
});
```

## Installation

```bash
npm install @near-wallet-selector/webauthn-wallet

yarn add @near-wallet-selector/webauthn-wallet

pnpm add @near-wallet-selector/webauthn-wallet
```

## Usage

### Basic Setup

```typescript
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWebAuthnWallet } from "@near-wallet-selector/webauthn-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";

async function initWallet() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [
      setupWebAuthnWallet({
        relayerUrl: "https://your-app.com/api/relayer"
      })
    ]
  });

  const modal = setupModal(selector, {
    contractId: "your-contract.testnet"
  });

  return { selector, modal };
}
```

### Configuration Options

```typescript
interface WebAuthnWalletOptions {
  /**
   * Required: Relayer URL endpoint for creating NEAR accounts
   * The relayer should accept POST requests with the following payload:
   * {
   *   accountId: string,    // The NEAR account ID to create
   *   publicKey: string     // The WebAuthn public key to add to the account
   * }
   * 
   * Expected response format:
   * {
   *   success: boolean
   * }
   */
  relayerUrl: string;
}

setupWebAuthnWallet({
  relayerUrl: "https://your-app.com/api/relayer",
})
```

### Relayer Implementation

Your relayer endpoint must:
- Accept POST requests with `accountId` and `publicKey` in the JSON body
- Create a NEAR account with the provided account ID
- Add the provided public key as an access key to the account
- Return a JSON response with `success: boolean`
- Handle account creation failures appropriately

Example relayer request:
```typescript
POST https://your-app.com/api/relayer
Content-Type: application/json

{
  "accountId": "user.testnet",
  "publicKey": "ed25519:..."
}
```

Example relayer response:
```typescript
{
  "success": true
}
```



## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
