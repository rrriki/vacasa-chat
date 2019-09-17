import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatService implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void {}

  async sendEvent(event: string, message: any): Promise<string> {
    console.log(`EMITTING EVENT: ${ event }`);
    return new Promise<string>((resolve, reject) => {
      try {
        this.socket.emit(event, message, (response) => {
          console.log(`SUCCESS EMITTING EVENT: ${ event }, ACK FROM SERVER: ${ response }`);
          resolve(response);
        });
      } catch (e) {
        console.log(`ERROR EMITTING EVENT: ${ event }, ${e.message}`);
        reject(e.message);
      }
    });
  }

  receiveEvent(event) {
    return this.socket.fromEvent(event);
  }
}
