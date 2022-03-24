import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AccountInfo } from "near-wallet-selector";
import Big from "big.js";

export type Sumbitted = SubmitEvent & { target: { elements: { [key: string]: HTMLInputElement } }};

@Component({
  selector: 'near-wallet-selector-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() account: AccountInfo;
  @Output() addMessage: EventEmitter<Sumbitted> = new EventEmitter();
  maxValue: string;

  ngOnInit(): void {
    this.maxValue = Big(this.account.balance).div(10 ** 24).toString();
  }

  onSubmit (event: Sumbitted) {
    this.addMessage.emit(event)
  }
}
