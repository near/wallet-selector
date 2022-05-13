# @near-wallet-selector/angular-selector-ui

This is the `wallet-selector-modal` angular component package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/angular-selector-ui

# Using NPM.
npm install @near-wallet-selector/angular-selector-ui
```

Then use it in your dApp:

First add `SelectorUiAngularModule` to the imports array in the module you wish to use it.

```ts
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SelectorUiAngularModule } from "@near-wallet-selector/angular-selector-ui";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, FormsModule, SelectorUiAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
Then in your component, it can be any component.

```ts
// app.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { WalletSelector } from "@near-wallet-selector/core";

import { WalletSelectorModal } from "@near-wallet-selector/angular-selector-ui";

@Component({
  selector: "near-wallet-selector-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  selector: WalletSelector;

  @ViewChild(WalletSelectorModal, { static: true })
  walletSelectorModal: WalletSelectorModal;

  ngOnInit() {
    // To initalize the wallet selector see:
    // https://github.com/near/wallet-selector#installation-and-usage
    // https://github.com/near/wallet-selector/blob/main/examples/angular/src/app/app.component.ts
    // After setting up the wallet selector, you can add it to the modal
    
    this.walletSelectorModal.setSelector(this.selector);
  }

  showModal() {
    this.walletSelectorModal.show();
  }
  
  // Hide modal programmatically
  hideModal() {
    this.walletSelectorModal.hide();
  }
}

```

Then in the HTML markup of the component:

```html
<!--app.component.html-->
<main>
  <button (click)="showModal()">Show Modal</button>
  
  <wallet-selector-modal></wallet-selector-modal>
</main>

```

## Modal details

Find all `wallet-selector-modal` details [here](../selector-ui/src/components/wallet-selector-modal)


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
