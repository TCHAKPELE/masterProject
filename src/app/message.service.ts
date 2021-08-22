import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  number: number[] = [];
  count = 0;

  add(message: string) {
    this.messages.push(message);
    this.count = this.count + 1
    this.number.push(this.count);
  }

  clear() {
    this.messages = [];
    this.number = [];
  }
}