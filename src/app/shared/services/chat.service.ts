import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '@shared/models/user';

const CHATS = '/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatId: string;

  constructor(
    private rtdb: AngularFireDatabase,
  ) { }

  getMessages(chatId: string): Observable<any[]> {
    return this.rtdb.list(`${CHATS}/${chatId}`).valueChanges();
  }

  // async sendMessage(
  //   disposalId: string,
  //   sender: string,
  //   message: string
  // ): Promise<void> {
  //   const chatRef = this.rtdb.list(`${CHATS}/${disposalId}`);
  //   await chatRef.push({
  //     sender,
  //     message,
  //   });
  // }

  async joinChatGroup(userObj: User, chatId: string) {
    // const key = this.rtdb.createPushId();

    // this.rtdb.list(`${CHATS}/${chatId}/messagesList`)
    // await this.rtdb.list(CHATS).set(key, {
    //   host: userObj,
    //   text: `${userObj.name} created this chat group.`,
    //   timeSent: new Date()
    // });
    // this.chatId = key;
  }

  async createChatGroup(userObj: User): Promise<void> {
    const key = this.rtdb.createPushId();
    await this.rtdb.list(CHATS).set(key, {
      host: userObj,
      messagesList: [{
        text: `${userObj.name} created this chat group.`,
        timeSent: new Date()
      }]
    });
    this.chatId = key;
  }
}
