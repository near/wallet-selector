import React from "react";
import ReactDOM from "react-dom";
import BN from "bn.js";

import WalletController, {
	SignInParams,
} from "../controllers/WalletController";
import Modal from "../modal/Modal";
import EventHandler, { Emitter, EventList } from "../utils/EventsHandler";
import ProviderService from "../services/provider/ProviderService";
import { updateState } from "../state/State";
import { MODAL_ELEMENT_ID } from "../constants";
import { Options } from "../interfaces/Options";
import { Action, TxAction } from "../wallets/actions";
import getConfig, { NetworkConfiguration } from "../config";

import { Transaction, functionCall } from "near-api-js/lib/transaction";
import { CodeResult } from "near-api-js/lib/providers/provider";

interface WalletMethodArgs {
	signerId?: string;
	receiverId?: string;
	methodName?: string;
	args?: any;
	gas?: string | BN;
	attachedDeposit?: string | BN;
	actions: Array<Action | TxAction>;
	/** list of transactions to sign */
    transactions?: Transaction[];
    /** url NEAR Wallet will redirect to after transaction signing is complete */
    callbackUrl?: string;
    /** meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url search param */
    meta?: string;
}

export default class NearWalletSelector {
	private options: Options;
	private emitter: Emitter;
	private controller: WalletController;

	network: NetworkConfiguration

	static async init(options: Options) {
		const selector = new NearWalletSelector(options);

		await selector.controller.init();
		selector.renderModal();

		return selector;
	}

	private constructor(options: Options) {
		const config = getConfig(options.networkId);
		const emitter = new EventHandler();
		const provider = new ProviderService(config.nodeUrl);
		const controller = new WalletController(options, provider, emitter);

		this.network = config;
		this.options = options;
		this.emitter = emitter;
		this.controller = controller;
	}

	private renderModal() {
		const el = document.createElement("div");
		el.id = MODAL_ELEMENT_ID;
		document.body.appendChild(el);

		ReactDOM.render(
			<Modal options={this.options} wallets={this.controller.getWallets()} />,
			document.getElementById(MODAL_ELEMENT_ID)
		);
	}

	show() {
		updateState((prevState) => ({
			...prevState,
			showModal: true,
			showWalletOptions: true,
			showLedgerDerivationPath: false,
			showWalletNotInstalled: null,
			showSwitchNetwork: false,
		}));
	}

	hide() {
		updateState((prevState) => ({
			...prevState,
			showModal: false,
		}));
	}

	signIn(params: SignInParams) {
		return this.controller.signIn(params);
	}

	signOut() {
		return this.controller.signOut();
	}

	isSignedIn() {
		return this.controller.isSignedIn();
	}

	getAccounts() {
		return this.controller.getAccounts();
	}

	on(event: EventList, callback: () => void) {
		return this.emitter.on(event, callback);
	}

	off(event: EventList, callback: () => void) {
		this.emitter.off(event, callback);
	}

	getContractId() {
		return this.options.contractId;
	}

	async getActiveAccount(signerId?: string): Promise<any> {
		const wallet = this.controller.getSelectedWallet();

		const accounts = await this.getAccounts();

		if (!wallet) {
			throw new Error("Wallet not selected");
		}

		if (!accounts.length) {
			throw new Error("No accounts available for signing");
		}

		signerId = signerId || accounts[0].accountId

		if (!accounts.some((x) => x.accountId === signerId)) {
			throw new Error("Invalid signerId");
		}

		return { wallet, signerId }
	}

	/// naj interface

	async signAndSendTransaction({
		signerId,
		receiverId,
		actions,
	}: WalletMethodArgs) {
		const { wallet, signerId: _signerId } = await this.getActiveAccount(signerId);
		signerId = _signerId;

		receiverId = receiverId || this.getContractId();

		return wallet.signAndSendTransaction({
			signerId,
			receiverId,
			actions,
		});
	}

	/// TODO test these

	async requestSignTransactions({
		signerId,
		transactions,
		callbackUrl,
		meta
	}: WalletMethodArgs) {
		const { wallet, signerId: _signerId } = await this.getActiveAccount(signerId);
		signerId = _signerId;

		return wallet.requestSignTransactions({
			transactions,
			callbackUrl,
			meta
		})
	}

	async viewFunction({
		receiverId,
		methodName,
		args
	}: WalletMethodArgs) {

		return this.controller.provider.query<CodeResult>({
			request_type: "call_function",
			account_id: receiverId,
			method_name: methodName,
			args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
			finality: "optimistic",
		})
			.then((res) => JSON.parse(Buffer.from(res.result).toString()));
	}

	async functionCall({
		signerId,
		receiverId,
		methodName,
		args,
		gas,
		attachedDeposit
	}: WalletMethodArgs) {

		if (!methodName) {
			throw new Error("functionCall error: methodName undefined");
		}

		return this.signAndSendTransaction({
			signerId,
			receiverId,
			actions: [
				functionCall(
					methodName,
					args,
					gas ? (typeof gas === 'string' ? new BN(gas) : gas) : new BN('30000000000000'),
					attachedDeposit ? (typeof attachedDeposit === 'string' ? new BN(attachedDeposit) : attachedDeposit) : new BN('0')
				)
			],
		})
	}
}
