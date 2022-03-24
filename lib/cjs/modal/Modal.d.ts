import React from "react";
import { State } from "../state/State";
import { Options } from "../interfaces/Options";
import { Wallet } from "../wallets/Wallet";
declare global {
    interface Window {
        updateWalletSelector: (state: State) => void;
    }
}
interface ModalProps {
    options: Options;
    wallets: Array<Wallet>;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
