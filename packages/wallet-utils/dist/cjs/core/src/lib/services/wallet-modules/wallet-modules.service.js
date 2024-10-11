"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModules = void 0;
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
const logger_service_1 = require("../logger/logger.service");
const constants_1 = require("../../constants");
const json_storage_service_1 = require("../storage/json-storage.service");
class WalletModules {
    factories;
    storage;
    options;
    store;
    emitter;
    provider;
    modules;
    instances;
    constructor({ factories, storage, options, store, emitter, provider, }) {
        this.factories = factories;
        this.storage = storage;
        this.options = options;
        this.store = store;
        this.emitter = emitter;
        this.provider = provider;
        this.modules = [];
        this.instances = {};
    }
    async validateWallet(id) {
        let accounts = [];
        const wallet = await this.getWallet(id);
        if (wallet) {
            // Ensure our persistent state aligns with the selected wallet.
            // For example a wallet is selected, but it returns no accounts (not signed in).
            accounts = await wallet.getAccounts().catch((err) => {
                logger_service_1.logger.log(`Failed to validate ${wallet.id} during setup`);
                logger_service_1.logger.error(err);
                return [];
            });
        }
        return accounts;
    }
    async resolveStorageState() {
        const jsonStorage = new json_storage_service_1.JsonStorage(this.storage, constants_1.PACKAGE_NAME);
        const pendingSelectedWalletId = await jsonStorage.getItem(constants_1.PENDING_SELECTED_WALLET_ID);
        const pendingContract = await jsonStorage.getItem(constants_1.PENDING_CONTRACT);
        const rememberRecentWallets = await jsonStorage.getItem(constants_1.REMEMBER_RECENT_WALLETS);
        if (pendingSelectedWalletId && pendingContract) {
            const accounts = await this.validateWallet(pendingSelectedWalletId);
            await jsonStorage.removeItem(constants_1.PENDING_SELECTED_WALLET_ID);
            await jsonStorage.removeItem(constants_1.PENDING_CONTRACT);
            if (accounts.length) {
                const { selectedWalletId } = this.store.getState();
                const selectedWallet = await this.getWallet(selectedWalletId);
                if (selectedWallet && pendingSelectedWalletId !== selectedWalletId) {
                    await selectedWallet.signOut().catch((err) => {
                        logger_service_1.logger.log("Failed to sign out existing wallet");
                        logger_service_1.logger.error(err);
                    });
                }
                let recentlySignedInWalletsFromPending = [];
                if (rememberRecentWallets === constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
                    recentlySignedInWalletsFromPending =
                        await this.setWalletAsRecentlySignedIn(pendingSelectedWalletId);
                }
                return {
                    accounts,
                    contract: pendingContract,
                    selectedWalletId: pendingSelectedWalletId,
                    recentlySignedInWallets: recentlySignedInWalletsFromPending,
                    rememberRecentWallets: rememberRecentWallets || constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED,
                };
            }
        }
        const { contract, selectedWalletId } = this.store.getState();
        const accounts = await this.validateWallet(selectedWalletId);
        const recentlySignedInWallets = await jsonStorage.getItem(constants_1.RECENTLY_SIGNED_IN_WALLETS);
        if (!accounts.length) {
            return {
                accounts: [],
                contract: null,
                selectedWalletId: null,
                recentlySignedInWallets: recentlySignedInWallets || [],
                rememberRecentWallets: rememberRecentWallets || constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED,
            };
        }
        return {
            accounts,
            contract,
            selectedWalletId,
            recentlySignedInWallets: recentlySignedInWallets || [],
            rememberRecentWallets: rememberRecentWallets || constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED,
        };
    }
    async setWalletAsRecentlySignedIn(walletId) {
        const jsonStorage = new json_storage_service_1.JsonStorage(this.storage, constants_1.PACKAGE_NAME);
        let recentlySignedInWallets = await jsonStorage.getItem(constants_1.RECENTLY_SIGNED_IN_WALLETS);
        if (!recentlySignedInWallets) {
            recentlySignedInWallets = [];
        }
        if (!recentlySignedInWallets.includes(walletId)) {
            recentlySignedInWallets.unshift(walletId);
            recentlySignedInWallets = recentlySignedInWallets.slice(0, 5);
            await jsonStorage.setItem(constants_1.RECENTLY_SIGNED_IN_WALLETS, recentlySignedInWallets);
        }
        return recentlySignedInWallets;
    }
    async signOutWallet(walletId) {
        const wallet = (await this.getWallet(walletId));
        await wallet.signOut().catch((err) => {
            logger_service_1.logger.log(`Failed to sign out ${wallet.id}`);
            logger_service_1.logger.error(err);
            // At least clean up state on our side.
            this.onWalletSignedOut(wallet.id);
        });
    }
    async onWalletSignedIn(walletId, { accounts, contractId, methodNames }) {
        const { selectedWalletId, rememberRecentWallets } = this.store.getState();
        const jsonStorage = new json_storage_service_1.JsonStorage(this.storage, constants_1.PACKAGE_NAME);
        const contract = { contractId, methodNames };
        if (!accounts.length) {
            const module = this.getModule(walletId);
            // We can't guarantee the user will actually sign in with browser wallets.
            // Best we can do is set in storage and validate on init.
            if (module.type === "browser") {
                await jsonStorage.setItem(constants_1.PENDING_SELECTED_WALLET_ID, walletId);
                await jsonStorage.setItem(constants_1.PENDING_CONTRACT, contract);
            }
            return;
        }
        if (selectedWalletId && selectedWalletId !== walletId) {
            await this.signOutWallet(selectedWalletId);
        }
        let recentlySignedInWallets = [];
        if (rememberRecentWallets === constants_1.REMEMBER_RECENT_WALLETS_STATE.ENABLED) {
            recentlySignedInWallets = await this.setWalletAsRecentlySignedIn(walletId);
        }
        this.store.dispatch({
            type: "WALLET_CONNECTED",
            payload: {
                walletId,
                contract,
                accounts,
                recentlySignedInWallets,
                rememberRecentWallets,
            },
        });
        this.emitter.emit("signedIn", {
            walletId,
            contractId,
            methodNames,
            accounts,
        });
    }
    onWalletSignedOut(walletId) {
        this.store.dispatch({
            type: "WALLET_DISCONNECTED",
            payload: { walletId },
        });
        this.emitter.emit("signedOut", { walletId });
    }
    setupWalletEmitter(module) {
        const emitter = new event_emitter_service_1.EventEmitter();
        emitter.on("signedOut", () => {
            this.onWalletSignedOut(module.id);
        });
        emitter.on("signedIn", (event) => {
            this.onWalletSignedIn(module.id, event);
        });
        emitter.on("accountsChanged", async ({ accounts }) => {
            this.emitter.emit("accountsChanged", { walletId: module.id, accounts });
            if (!accounts.length) {
                return this.signOutWallet(module.id);
            }
            this.store.dispatch({
                type: "ACCOUNTS_CHANGED",
                payload: { walletId: module.id, accounts },
            });
        });
        emitter.on("networkChanged", ({ networkId }) => {
            this.emitter.emit("networkChanged", { walletId: module.id, networkId });
        });
        emitter.on("uriChanged", ({ uri }) => {
            this.emitter.emit("uriChanged", { walletId: module.id, uri });
        });
        return emitter;
    }
    validateSignMessageParams({ message, nonce, recipient, }) {
        if (!message || message.trim() === "") {
            throw new Error("Invalid message. It must be a non-empty string.");
        }
        if (!Buffer.isBuffer(nonce) || nonce.length !== 32) {
            throw new Error("Invalid nonce. It must be a Buffer with a length of 32 bytes.");
        }
        if (!recipient || recipient.trim() === "") {
            throw new Error("Invalid recipient. It must be a non-empty string.");
        }
    }
    decorateWallet(wallet) {
        const _signIn = wallet.signIn;
        const _signOut = wallet.signOut;
        const _signMessage = wallet.signMessage;
        wallet.signIn = async (params) => {
            const accounts = await _signIn(params);
            const { contractId, methodNames = [] } = params;
            await this.onWalletSignedIn(wallet.id, {
                accounts,
                contractId,
                methodNames,
            });
            return accounts;
        };
        wallet.signOut = async () => {
            await _signOut();
            this.onWalletSignedOut(wallet.id);
        };
        wallet.signMessage = async (params) => {
            if (_signMessage === undefined) {
                throw Error(`The signMessage method is not supported by ${wallet.metadata.name}`);
            }
            this.validateSignMessageParams(params);
            return await _signMessage(params);
        };
        return wallet;
    }
    async setupInstance(module) {
        if (!module.metadata.available) {
            const message = module.type === "injected" ? "not installed" : "not available";
            throw Error(`${module.metadata.name} is ${message}`);
        }
        const wallet = {
            id: module.id,
            type: module.type,
            metadata: module.metadata,
            ...(await module.init({
                id: module.id,
                type: module.type,
                metadata: module.metadata,
                options: this.options,
                store: this.store.toReadOnly(),
                provider: this.provider,
                emitter: this.setupWalletEmitter(module),
                logger: new logger_service_1.Logger(module.id),
                storage: new json_storage_service_1.JsonStorage(this.storage, [constants_1.PACKAGE_NAME, module.id]),
            })),
        };
        return this.decorateWallet(wallet);
    }
    getModule(id) {
        return this.modules.find((x) => x.id === id);
    }
    async getWallet(id) {
        const module = this.getModule(id);
        if (!module) {
            return null;
        }
        const { selectedWalletId } = this.store.getState();
        // If user uninstalled/removed a wallet which was previously signed in with
        // best we can do is clean up state on our side.
        if (!module.metadata.available && selectedWalletId) {
            this.onWalletSignedOut(selectedWalletId);
            return null;
        }
        return (await module.wallet());
    }
    async setup() {
        const modules = [];
        for (let i = 0; i < this.factories.length; i += 1) {
            const module = await this.factories[i]({ options: this.options }).catch((err) => {
                logger_service_1.logger.log("Failed to setup module");
                logger_service_1.logger.error(err);
                return null;
            });
            // Filter out wallets that aren't available.
            if (!module) {
                continue;
            }
            // Skip duplicated module.
            if (modules.some((x) => x.id === module.id)) {
                continue;
            }
            modules.push({
                id: module.id,
                type: module.type,
                metadata: module.metadata,
                wallet: async () => {
                    let instance = this.instances[module.id];
                    if (instance) {
                        return instance;
                    }
                    instance = await this.setupInstance(module);
                    this.instances[module.id] = instance;
                    return instance;
                },
            });
        }
        this.modules = modules;
        const { accounts, contract, selectedWalletId, recentlySignedInWallets, rememberRecentWallets, } = await this.resolveStorageState();
        this.store.dispatch({
            type: "SETUP_WALLET_MODULES",
            payload: {
                modules,
                accounts,
                contract,
                selectedWalletId,
                recentlySignedInWallets,
                rememberRecentWallets,
            },
        });
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].type !== "instant-link") {
                continue;
            }
            const wallet = (await this.modules[i].wallet());
            if (!wallet.metadata.runOnStartup) {
                continue;
            }
            try {
                await wallet.signIn({ contractId: wallet.getContractId() });
            }
            catch (err) {
                logger_service_1.logger.error("Failed to sign in to wallet. " + err);
            }
        }
    }
}
exports.WalletModules = WalletModules;
