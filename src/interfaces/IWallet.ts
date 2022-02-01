import { SerializableAction } from "./transactions";

export interface ViewParams {
  contractId: string;
  methodName: string;
  args?: object;
}

export interface CallV1Params {
  receiverId: string;
  actions: Array<SerializableAction>;
}

export default interface IWallet {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getIcon(): string;
  getShowWallet(): boolean;

  walletSelected(): void;
  init(): Promise<void>;
  disconnect(): void;
  isConnected(): Promise<boolean>;
  setWalletAsSignedIn(): Promise<void>;
  signIn(): Promise<void>;
  getAccount(): Promise<any>;
  view(params: ViewParams): Promise<any>;
  callV1(params: CallV1Params): Promise<any>;
}
