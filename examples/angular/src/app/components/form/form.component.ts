import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";
import Big from "big.js";

export interface NewMessage {
  donation: string;
  message: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() account: AccountInfo;
  @Output() onAddMessage: EventEmitter<NewMessage> = new EventEmitter();
  donation  = "0";
  message = '';
  maxValue: string;

  ngOnInit(): void {
    this.maxValue = Big(this.account.balance).div(10 ** 24).toString();
  }

  onSubmit () {
    const data: NewMessage = {
      message: this.message.toString(),
      donation: this.donation.toString()
    }
    this.onAddMessage.emit(data)
  }
}
