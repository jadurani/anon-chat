import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private createUser(name: string) {

  }

  async joinChatGroup(name: string, chatId: string){
    this.createUser(name);
  }

  async createChatGroup(name: string) {
    this.createUser(name);
  }
}
