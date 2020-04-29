import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '@shared/models/user';

const USERS = '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userObj: User;

  constructor(private rtdb: AngularFireDatabase) { }

  async createUser(name: string): Promise<User> {
    const key = this.rtdb.createPushId();
    const userObj: User = {
      id: key,
      name,
      avatarUrl: ''
    }
    await this.rtdb.list(USERS).set(key, userObj);
    this.userObj = userObj;
    return userObj;
  }
}
