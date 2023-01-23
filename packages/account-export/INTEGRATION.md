# @near-wallet-selector/account-export

## Wallet Selector Integration

Implementing account imports in Wallet Selector requires either:
- Direct method call to an installed browser extension (injected wallets only)
- URL with encrypted account data, either a link to a wallet domain or a deep link for mobile wallets

### Injected Wallets
For injected wallets implemented in browser extensions, calling a method directly on this plugin is permitted without encryption of account data.
To use this method, an injected wallet would implement the [importAccountsInSecureContext](../core/src/lib/wallet/wallet.types.ts) method e.g.:
```ts
importAccountsInSecureContext(params: AccountImportSecureContextParams): Promise<void> {
    params.forEach(({ accountId, privateKey }) => {
        this.wallet.importAccount({ accountId, privateKey });
    });
}
```

Note that this is the default expected behavior for injected wallets. Injected wallets may opt into the URL-based approach described below by setting
the `useUrlAccountImport` flag on `InjectedWalletMetadata` to `true`.

### URL-Based

Wallets may instead opt to implement a URL-based strategy, including browser wallets, mobile wallets via deep links, and injected wallets with a web component capable of
communicating with an extension. To use a URL, the [buildImportAccountsUrl](../core/src/lib/wallet/wallet.types.ts) must be implemented to return the base URL for the account import. The encrypted data will
then be appended to this URL as a fragment before redirecting the user to the composed URL, e.g.:
```ts
buildImportAccountsUrl(): string {
  /* this URL must exist and parse the fragment data */
  return `https://awesome-near-wallet.xyz/${this.state.networkId}`;
}
```

The Wallet Selector will use this base URL and append encrypted data to it before redirecting there, so the final URL would be in the form of `"https://awesome-near-wallet.xyz/mainnet#xyz...abc"`

:warning:
**Once the user is redirected, the destination site should call `history.replaceState()` to prevent user data from being unnecessarily exposed in the browser.**
:warning:

Once redirected, the user would be prompted for the passphrase used to encrypt this data so that it could be decrypted in the destination wallet. The symmetric decryption method should be imported
from this library:

```ts
import { decryptAccountData } from "@wallet-selector/account-export";
const accounts = decryptAccountData({ ciphertext: urlHash, secretKey: userInputSecret });
```
