import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../message.service';

// Interface
interface Notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public notifications: Notification;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.notifications;
  }

}
