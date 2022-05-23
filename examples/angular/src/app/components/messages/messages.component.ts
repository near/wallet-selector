import { Component, Input } from "@angular/core";
import type { Message } from "../../interfaces/message";

@Component({
  selector: "near-wallet-selector-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent {
  @Input() messages: Array<Message>;
}
