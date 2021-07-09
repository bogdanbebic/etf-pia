import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { BackendReturnCode } from '../backend-return-code';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passwordOld: string;
  password: string;
  passwordRepeat: string;

  invalidPasswordChange = false;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.authorizationService.changePassword(
      this.passwordOld, this.password, this.passwordRepeat).subscribe((ok: BackendReturnCode) => {
      if (ok.ok)
        this.authorizationService.logout();
      else
        this.invalidPasswordChange = true;
    });
  }

}
