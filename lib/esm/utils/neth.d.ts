export function getEthereum(): Promise<{
    signer: any;
    ethAddress: any;
}>;
export function hasAppKey(accountId: any): Promise<boolean>;
export function getAccount(): Promise<any>;
export function signIn(): Promise<any>;
export function signOut(): Promise<void | {
    accountId: any;
}>;
export function isSignedIn(): boolean;
export function getNear(): any;
export function getAppKey({ signer, ethAddress: eth_address }: {
    signer: any;
    ethAddress: any;
}): Promise<{
    publicKey: any;
    secretKey: any;
    account: nearAPI.Account;
}>;
export function signAndSendTransaction({ receiverId, actions, }: {
    receiverId: any;
    actions: any;
}): Promise<any>;
export function convertActions(actions: any, accountId: any, receiverId: any): any;
import * as nearAPI from "near-api-js";
