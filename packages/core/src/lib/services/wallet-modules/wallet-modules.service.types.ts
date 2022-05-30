import type { WalletModuleFactory } from "../../wallet";
import type { StorageService } from "../storage/storage.service.types";
import type { Options } from "../../options.types";
import type { Store } from "../../store.types";
import { EventEmitter } from "../event-emitter/event-emitter.service";
import type { WalletSelectorEvents } from "../../wallet-selector.types";

export interface WalletModulesParams {
  factories: Array<WalletModuleFactory>;
  storage: StorageService;
  options: Options;
  store: Store;
  emitter: EventEmitter<WalletSelectorEvents>;
}
