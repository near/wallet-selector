import {Component, Input, OnInit} from '@angular/core';
import { Message } from "../../app.component";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() messages: Message[];
}
