export interface State {
    showModal: boolean;
    showWalletOptions: boolean;
    showLedgerDerivationPath: boolean;
    showSenderWalletNotInstalled: boolean;
    showSwitchNetwork: boolean;
    selectedWalletId: string | null;
}
export declare const updateState: (func: (prevState: State) => State) => void;
export declare const getState: () => State;
