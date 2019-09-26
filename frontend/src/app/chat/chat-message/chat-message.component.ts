import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../../typing/message.interface';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  isFromCurrentUser: boolean;
   api_url = environment.api_url;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const {user} = this.message;
    const currentUser = this.auth.getLoggedUser();
    this.isFromCurrentUser = user._id === currentUser._id;

    console.log('message from users:', user._id);
  }

}
