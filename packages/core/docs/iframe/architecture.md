## **Architecture Comparison**

### **Traditional Wallet Module Architecture**

```tsx
// Traditional Implementation
export function setupMyNearWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
}: MyNearWalletParams = {}): WalletModuleFactory<InjectedWallet> {
  return async (moduleOptions) => {
    return {
      id: "my-wallet",
      type: "injected",
      metadata: {
        name: "MyWallet",
        description:
          "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true,
        downloadUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl),
      },
      init: (options) => {
        return {
          signIn(){},
          signOut(){},
          signAndSendTransaction(){},
          signAndSendTransactions(){},
          signMessage(){},
          //etc
        }
      },
    };
  };
}

```

**Characteristics:**

- Direct access to browser APIs
- Full access to localStorage, sessionStorage
- Direct network requests
- Shared JavaScript context with parent
- Direct DOM manipulation capabilities

### **Iframe Wallet Architecture**

```tsx
// Iframe Implementation
class IframeWalletAdapter {
  private iframeManager: IframeManager;
  private messageBridge: MessageBridge;

  async init(options: WalletBehaviourOptions) {
    this.iframeManager = new IframeManager({
      // URL of the iframe content that contains the wallet implementation
      source: module.source,
      // Optional array of sandbox permissions for the iframe
      // e.g. ['allow-scripts', 'allow-same-origin', 'allow-popups']
      permissions: module.permissions || []
    });

    this.messageBridge = new MessageBridge(this.iframeManager);
  }

  async signIn(params: SignInParams) {
    // Message-based communication
    return await this.executeMethod('signIn', params);
  }
  
  // other methods
  // signOut()
  // signAndSendTransaction()
  // etc

  private async executeMethod<T>(
    method: WalletMethod,
    params?: unknown
  ): Promise<T> {
    await this.ensureIframeReady();

    return await this.messageBridge!.sendMessage<T>({
      type: "WALLET_METHOD_CALL",
      method,
      params,
      walletId: this.options.id,
    });
  }
}

```

**Characteristics:**

- Isolated JavaScript context
- Message-based communication
- Sandboxed environment
- Limited API access based on permissions
- Secure cross-origin communication