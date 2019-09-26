import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {ChatService} from './chat.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {chatRoutes} from './chat.routes';
import {environment} from '../../environments/environment';
import {ChatMessageComponent} from './chat-message/chat-message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoutes),
    SocketIoModule.forRoot({url: environment.wss_url}),
    FontAwesomeModule,
  ],
  declarations: [ChatRoomComponent, ChatMessageComponent],

  providers: [ChatService],
  exports: [
    ChatRoomComponent,
  ],
})
export class ChatModule {
}
