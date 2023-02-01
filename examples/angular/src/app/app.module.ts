import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { FormComponent } from "./components/form/form.component";
import { ContentComponent } from "./components/content/content.component";
import { WalletSelectorComponent } from "./pages/wallet-selector/wallet-selector.component";
import { WalletSelectorExportComponent } from "./pages/wallet-selector-export/wallet-selector-export.component";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MessagesComponent,
    FormComponent,
    ContentComponent,
    WalletSelectorComponent,
    WalletSelectorExportComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
