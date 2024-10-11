"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockWallet = void 0;
// Remove Jest import
// import * as jest from "jest";
const jest_mock_extended_1 = require("jest-mock-extended");
const options_1 = require("./options");
const store_1 = require("./store");
const services_1 = require("./services");
const createStorageMock = () => {
    const _state = {};
    return {
        getItem: async (key) => _state[key] || null, // Replace jest.fn() with plain async functions
        setItem: async (key, value) => {
            _state[key] = value;
        },
        removeItem: async (key) => {
            delete _state[key];
        },
    };
};
const mockWallet = async (factory, deps) => {
    const { options, storage } = (0, options_1.resolveOptions)({
        network: (0, options_1.getNetworkPreset)("testnet"),
        storage: createStorageMock(),
        modules: [factory],
        ...deps?.options,
    });
    const emitter = new services_1.EventEmitter();
    const store = await (0, store_1.createStore)(storage);
    const walletModules = new services_1.WalletModules({
        factories: [factory],
        storage,
        options,
        store,
        emitter,
        provider: deps?.provider || (0, jest_mock_extended_1.mock)(),
    });
    await walletModules.setup();
    const { modules } = store.getState();
    const wallet = await walletModules.getWallet(modules[0].id);
    return {
        wallet: wallet,
        storage,
    };
};
exports.mockWallet = mockWallet;
// import * as jest from "jest"
// import { mock } from "jest-mock-extended";
// import type { WalletModuleFactory, Wallet } from "./wallet";
// import type { ProviderService, StorageService } from "./services";
// import type { WalletSelectorEvents } from "./wallet-selector.types";
// import type { Options } from "./options.types";
// import { getNetworkPreset, resolveOptions } from "./options";
// import { createStore } from "./store";
// import { EventEmitter, WalletModules } from "./services";
//
// const createStorageMock = (): StorageService => {
//   const _state: Record<string, string> = {};
//
//   return {
//     getItem: jest.fn(async (key) => _state[key] || null),
//     setItem: jest.fn(async (key, value) => {
//       _state[key] = value;
//     }),
//     removeItem: jest.fn(async (key) => {
//       delete _state[key];
//     }),
//   };
// };
//
// export interface MockWalletDependencies {
//   options?: Options;
//   provider?: ProviderService;
// }
//
// export const mockWallet = async <Variation extends Wallet>(
//   factory: WalletModuleFactory,
//   deps?: MockWalletDependencies
// ) => {
//   const { options, storage } = resolveOptions({
//     network: getNetworkPreset("testnet"),
//     storage: createStorageMock(),
//     modules: [factory],
//     ...deps?.options,
//   });
//   const emitter = new EventEmitter<WalletSelectorEvents>();
//   const store = await createStore(storage);
//   const walletModules = new WalletModules({
//     factories: [factory],
//     storage,
//     options,
//     store,
//     emitter,
//     provider: deps?.provider || mock<ProviderService>(),
//   });
//
//   await walletModules.setup();
//
//   const { modules } = store.getState();
//   const wallet = await walletModules.getWallet<Variation>(modules[0].id);
//
//   return {
//     wallet: wallet!,
//     storage,
//   };
// };
