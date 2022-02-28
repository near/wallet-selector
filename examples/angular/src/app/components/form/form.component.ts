import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";
import Big from "big.js";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() account: AccountInfo;
  @Output() onAddMessage: EventEmitter<SubmitEvent> = new EventEmitter();
  maxValue: string;

  ngOnInit(): void {
    this.maxValue = Big(this.account.balance).div(10 ** 24).toString();
  }

  onSubmit (event: SubmitEvent) {
    this.onAddMessage.emit(event)
  }
}
