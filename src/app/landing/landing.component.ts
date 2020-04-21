import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



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

  constructor(private fb: FormBuilder) { }

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

  joinChat() {}

  hostChat() {}

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
