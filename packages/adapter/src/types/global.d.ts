declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setupWallet: () => Promise<any>;
    selector: {
      localStorage: Storage;
    };
  }
}

export {};
