import type { StorageService } from "./services";
import type { Store } from "./store.types";
export declare const createStore: (storage: StorageService) => Promise<Store>;
