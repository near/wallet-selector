import type { OnInit } from "@angular/core";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import Big from "big.js";
import { Account } from "../../interfaces/account";

export type Submitted = SubmitEvent & {
  target: { elements: { [key: string]: HTMLInputElement } };
};

@Component({
  selector: "near-wallet-selector-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  @Input() account: Account;
  @Output() addMessage: EventEmitter<Submitted> = new EventEmitter();
  maxValue: string;

  ngOnInit(): void {
    this.maxValue = Big(this.account.amount)
      .div(10 ** 24)
      .toString();
  }

  onSubmit(event: Submitted) {
    this.addMessage.emit(event);
  }
}
