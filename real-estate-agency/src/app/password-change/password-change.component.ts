import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passwordOld: string;
  password: string;
  passwordRepeat: string;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {
    // TODO: implement
  }

}
