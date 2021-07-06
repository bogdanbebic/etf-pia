import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { LoggedInUser } from '../logged-in-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  invalidCredentials = false;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

  login() {
    this.authorizationService.login(this.username, this.password).subscribe((user: LoggedInUser) => {
      console.log(user);
      if (!user) {
        this.invalidCredentials = true;
        return;
      }

      // TODO: redirect
    });
  }

}
