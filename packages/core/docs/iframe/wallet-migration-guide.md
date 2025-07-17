# **Wallet Migration Guide**

### **Step 1: Create Iframe-Compatible Wallet**

```tsx
// New iframe wallet structure
export const createIframeWallet = (): WalletModuleFactoryV2 => ({
  id: 'meteor-wallet-iframe',
  type: 'injected',
  metadata: {
    name: 'Meteor Wallet (Iframe)',
    description: 'Secure iframe-based Meteor Wallet',
    iconUrl: 'https://meteorwallet.app/icon.png',
    deprecated: false,
    available: true,
  },
  source: 'https://meteorwallet.app/iframe.js',
  permissions: ['allow-scripts'],// Minimal permissions
});
```

### **Step 2: External Script Requirements**

**A. Required `window.setupWallet()` Function**

```jsx
// External script (iframe.js) must expose this function
window.setupWallet = function() {
  return {
    init: async (options) => {
      // Initialize wallet in iframe context
      const wallet = new MeteorWalletIframe(options);
      await wallet.init();
      return wallet;
    }
  };
};

class MeteorWalletIframe {
  constructor(options) {
    this.options = options;
    this.messageBridge = new MessageBridge();
  }

  async init() {
    // Initialize wallet with iframe constraints
    this.keyStore = new IframeKeyStore(this.messageBridge);
    this.near = new Near({
      keyStore: this.keyStore,
      networkId: this.options.options.network.networkId,
      nodeUrl: this.options.options.network.nodeUrl,
    });
  }

  async signIn(params) {
    // Handle sign-in through message passing
    const result = await this.meteor.signIn(params);
    return result.accounts;
  }
}
```

### **B. Available `window.selector` Object**

The iframe environment provides a `window.selector` object that exposes parent context services and utilities:

```jsx
// Available in iframe context
window.selector = {
  // Storage Services
  localStorage: LocalStorageService,    // Proxy to parent localStorage
  storage: StorageService,             // General storage service
  
  // Core Services
  store: StoreService,                 // State management
  emitter: EmitterService,             // Event management
  provider: ProviderService,           // Network provider
  logger: Logger,                      // Logging service
  
  // Browser Context
  location: string,                    // Current page URL
  outerHeight: number,                 // Window height
  outerWidth: number,                  // Window width
  screenX: number,                     // Screen X position
  screenY: number,                     // Screen Y position
};
```

### **C. Service Usage Examples**

```jsx
// Using localStorage proxy
const userData = window.selector.localStorage.getItem('user_preferences');

// Using storage service
await window.selector.storage.setItem('wallet_data', JSON.stringify(data));

// Using provider service
const accountInfo = await window.selector.provider.query({
  accountId: 'user.testnet',
  methodName: 'get_balance',
  args: {}
});

// Using emitter service
await window.selector.emitter.emit('accountChanged', { accounts });

// Using store service
const state = window.selector.store.getState();

// Using logger
window.selector.logger.log('Wallet operation completed');
```

### **D. Browser Context Access**

```jsx
// Access browser context safely
const currentUrl = window.selector.location;
const windowSize = {
  height: window.selector.outerHeight,
  width: window.selector.outerWidth
};
const screenPosition = {
  x: window.selector.screenX,
  y: window.selector.screenY
};
```