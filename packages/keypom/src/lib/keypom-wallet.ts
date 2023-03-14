import type { Connection, Near, KeyPair } from "near-api-js";
import BN from "bn.js";
import type {
  FinalExecutionOutcome,
  InstantLinkWalletBehaviour,
  Account,
} from "@near-wallet-selector/core";
import type { PublicKey } from "near-api-js/lib/utils";

type KeypomWalletParams = {
  contractId: string;
  networkId?: string;
  desiredUrl?: string;
};

export class KeypomWallet implements InstantLinkWalletBehaviour {
  readonly networkId: string;
  readonly contractId: string;
  private readonly near: Near;
  private readonly connection: Connection;
  private readonly desiredUrl: string;

  private accountId?: string;
  private secretKey?: string;

  private publicKey?: PublicKey;
  private keyPair?: KeyPair;

  public constructor({
    contractId,
    networkId = "mainnet",
    desiredUrl = "/keypom-trial/",
  }: KeypomWalletParams) {
    // eslint-disable-next-line no-console
    console.log(networkId, desiredUrl);
    this.networkId = networkId;
    this.desiredUrl = desiredUrl;
    this.contractId = contractId;
  }
  getContractId(): string {
    return this.contractId;
  }

  getAccountId(): string {
    throw new Error("Method not implemented.");
  }

  public transformTransactions = () => {
    throw new Error("Not Implemented");
  };

  public parseUrl = () => {
    throw new Error("Not Implemented");
  };

  public tryInitFromLocalStorage(data: never) {
    // eslint-disable-next-line no-console
    console.log(data);
    throw new Error("Not Implemented");
  }

  public assertSignedIn() {
    throw new Error("Not Implemented");
  }

  public async isSignedIn() {
    return true;
  }

  async verifyOwner() {
    throw Error("KeypomWallet:verifyOwner is deprecated");
  }

  public async signOut() {
    throw new Error("Not Implemented");
  }

  public async getAvailableBalance(id?: string): Promise<BN> {
    // eslint-disable-next-line no-console
    console.log(id);
    // TODO: get access key allowance
    return new BN(0);
  }

  public async getAccounts(): Promise<Array<Account>> {
    return [{ accountId: "amirsaran333.testnet" }];
  }

  public async switchAccount(id: string) {
    // eslint-disable-next-line no-console
    console.log(id);
    // TODO:  maybe?
  }

  public async signIn(): Promise<Array<Account>> {
    // eslint-disable-next-line no-console
    console.log("Keypom::signIn()");
    return [{ accountId: "amirsaran333.testnet" }];
  }

  public async signAndSendTransaction(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
  ): Promise<FinalExecutionOutcome> {
    // eslint-disable-next-line no-console
    console.log(params);
    throw new Error("Not Implemented");
  }

  public async signAndSendTransactions(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
  ): Promise<Array<FinalExecutionOutcome>> {
    // eslint-disable-next-line no-console
    console.log(params);
    throw new Error("Not Implemented");
  }
}
