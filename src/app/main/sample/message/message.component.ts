import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../message.service';

// Interface
interface notification {
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

  public notifications: notification;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  
  }

}
