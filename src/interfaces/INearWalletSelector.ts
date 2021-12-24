export default interface INearWalletSelector {
  showModal(): void;
  hideModal(): void;
  isSignedIn(): boolean;
  signOut(): void;
  init(): void;
}
