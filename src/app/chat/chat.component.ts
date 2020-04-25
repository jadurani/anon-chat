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

  msg: string;
  sending = false;
  currentUser: User;
  chatId: string;
  chatMessages: ChatMessage[];
  chatSub: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {
    this.currentUser = this.userService.userObj;
    this.chatId = this.chatService.chatId;
    // TO DO: display this in the UI
    console.log(this.chatId)
  }

  ngOnInit() {
    this.chatSub = this.chatService
      .getMessages(this.chatId)
      .subscribe(
        (messages: ChatMessage[]) => (this.chatMessages = [...messages])
      );
  }

  async sendMessage() {
    this.sending = true;
    await this.chatService
      .sendMessage(this.currentUser, this.chatId, this.msg);
    this.msg = '';
    this.sending = false;
  }
}
