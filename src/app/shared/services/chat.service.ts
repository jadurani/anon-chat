import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { first } from 'rxjs/operators';
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
    return this.rtdb.list(`${CHATS}/${chatId}/messagesList`).valueChanges();
  }

  async sendMessage(userObj: User, chatId: string, text: string): Promise<void> {
    await this.rtdb.list(`${CHATS}/${chatId}/messagesList`).push({
      sender: userObj,
      text,
      timeSent: new Date().toString()
    });
  }

  async joinChatGroup(nickname: string, chatId: string) {
    const value = await this.rtdb.object(`${CHATS}/${chatId}`)
                                  .valueChanges()
                                  .pipe(first())
                                  .toPromise()

    if (!value) {
      throw `Chat group with ${chatId} doesn't exist`;
    }

    await this.rtdb.list(`${CHATS}/${chatId}/messagesList`).push({
      text: `${nickname} joined`,
      timeSent: new Date().toString()
    });

    this.chatId = chatId;
  }

  async createChatGroup(userObj: User): Promise<void> {
    const key = this.rtdb.createPushId();
    await this.rtdb.list(CHATS).set(key, {
      host: userObj,
      messagesList: [{
        text: `${userObj.name} created this chat group.`,
        timeSent: new Date().toString()
      }]
    });
    this.chatId = key;
  }
}
