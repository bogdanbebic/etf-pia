import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  invalidCredentials = false;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    // TODO: implement
    this.invalidCredentials = true;
  }

}
