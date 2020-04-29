import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@shared/services/chat.service';
import { UserService } from '@shared/services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  signInForm: FormGroup;
  processing = false;

  HOME = 0;
  HOST = 1;
  JOIN = 2;
  currentPage = this.HOME;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  willJoinChat() {
    this.currentPage = this.JOIN;
    this.signInForm = this.fb.group({
      nickname: ['', Validators.required],
      chatId: [null, Validators.required],
    });
  }

  willHostChat() {
    this.currentPage = this.HOST;
    this.signInForm = this.fb.group({
      nickname: ['', Validators.required],
    });
  }

  goBack() {
    this.currentPage = this.HOME;
  }

  async joinChat() {
    const { nickname, chatId } = this.signInForm.value
    this.processing = true;
    try {
      await this.userService.createUser(nickname);
      await this.chatService.joinChatGroup(nickname, chatId);
      this.router.navigate(['c']);
    } catch (error) {
      console.log(error);
    } finally {
      this.processing = false;
    }
  }

  async hostChat() {
    const { nickname } = this.signInForm.value
    this.processing = true;
    try {
      const userObj = await this.userService.createUser(nickname);
      await this.chatService.createChatGroup(userObj);
      this.router.navigate(['c']);
    } catch (error) {
      console.log(error);
    } finally {
      this.processing = false;
    }
  }

  public getError(controlName: string): string {
    const field = this.signInForm.get(controlName);

    const errorKeys = Object.keys(field.errors || {});
    if (!errorKeys.length) {
      return null;
    }

    const errorMsg = errorKeys[0];
    return `${errorMsg[0].toUpperCase()}${errorMsg.slice(1)}`;
  }
}
