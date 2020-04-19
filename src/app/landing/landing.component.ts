import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  signInForm: FormGroup;
  isHost = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      nickname: ['', Validators.required],
      chatId: [''],
    });
  }

}
