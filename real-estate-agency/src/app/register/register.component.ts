import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendReturnCode } from '../backend-return-code';
import { UserRoles } from '../user-roles.enum';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUserRole = UserRoles.Registered;
  agentRole = UserRoles.Agent;

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
  city: string;
  country: string;
  role: UserRoles;

  constructor(
    private snackBar: MatSnackBar,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
  }

  register() {
    const newUserData = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      passwordRepeat: this.passwordRepeat,
      email: this.email,
      city: this.city,
      country: this.country,
      role: this.role,
    };

    this.usersService.register(newUserData).subscribe((returnCode: BackendReturnCode) => {
      if (returnCode.ok) {
        this.snackBar.open("Registration success!", "OK", {
          duration: 2000
        });
      }
      else {
        this.snackBar.open("Registration failed!", "OK", {
          duration: 2000
        });
      }
    });
  }

}
