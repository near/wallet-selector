import { WalletModuleFactory } from "../../wallet";
import { StorageService } from "../storage/storage.service.types";
import { Options } from "../../options.types";
import { Store } from "../../store.types";
import { EventEmitter } from "../event-emitter/event-emitter.service";
import { WalletSelectorEvents } from "../../wallet-selector.types";

export interface WalletModulesParams {
  factories: Array<WalletModuleFactory>;
  storage: StorageService;
  options: Options;
  store: Store;
  emitter: EventEmitter<WalletSelectorEvents>;
}
