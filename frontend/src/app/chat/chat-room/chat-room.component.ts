import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {faPaperclip, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {Message} from '../../../../../typing/message.interface';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  private readonly room;
  private messages: Array<Message> = [];
  private faPaperclip = faPaperclip;
  private faPaperPlane = faPaperPlane;

  constructor(private readonly chat: ChatService, private readonly auth: AuthService) {
    this.room = 'meet-up-room';
  }

  async ngOnInit(): Promise<void> {
    this.chat.receiveEvent('message')
      .subscribe(this.handleMessage.bind(this));

    await this.chat.sendEvent('room', this.room);
  }

  private async sendMessage() {
    const messageBox: HTMLInputElement = document.getElementById('message-box') as HTMLInputElement;
    const message = messageBox.value;
    if (message) {
      await this.chat.sendEvent('message', {
        date: new Date(),
        user: this.auth.getLoggedUser(),
        message,
      });
    }
    messageBox.value = '';
  }

  private async handleMessage(message) {
    this.messages.push(message);
    const chatView: HTMLUListElement = document.getElementById('chat-view') as HTMLUListElement;
    chatView.scrollTop = chatView.scrollHeight + chatView.clientHeight;
  }

  async ngOnDestroy(): Promise<void> {
    await this.chat.sendEvent('leave', this.room);
  }
}


