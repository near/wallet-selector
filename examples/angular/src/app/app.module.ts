import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { FormComponent } from "./components/form/form.component";
import { ContentComponent } from "./components/content/content.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MessagesComponent,
    FormComponent,
    ContentComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
