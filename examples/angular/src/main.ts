import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import {
  defineCustomElements,
  applyPolyfills,
} from "@near-wallet-selector/selector-ui/loader";

if (environment.production) {
  enableProdMode();
}

applyPolyfills()
  .then(() => defineCustomElements())
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch((err) => console.error(err));
