export default interface INearWalletSelector {
  showModal(): void;
  hideModal(): void;
  isSignedIn(): boolean;
  signOut(): void;
  on(event: string, callback: () => void): void;
  getAccount(): Promise<any>;
}
