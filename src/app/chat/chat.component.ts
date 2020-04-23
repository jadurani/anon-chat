import { Component, OnInit } from '@angular/core';
import { ChatService } from '@shared/services/chat.service';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';
import { ChatMessage } from '@shared/models/chat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatId = '-M5_Y-N2hIwN-QH904vQ';

  msg: string;
  sending = false;
  currentUser: User

  chatMessages: ChatMessage[];

  chatSub: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.chatSub = this.chatService
      .getMessages(this.chatId)
      .subscribe(
        (messages: ChatMessage[]) => (this.chatMessages = [...messages])
      );
  }


  async sendMessage() {
    this.sending = true;
    const userObj: User = {
      id: 'rawrawr',
      name: 'kiyaaaaa',
      avatarUrl: ''
    }
    await this.chatService.sendMessage(userObj, this.chatId, this.msg);
    this.msg = '';
    this.sending = false;
  }

}
