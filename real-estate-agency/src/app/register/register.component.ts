import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRoles } from '../user-roles.enum';


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
  email: string;
  city: string;
  country: string;
  role: UserRoles;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {
    // TODO: implement
    this.snackBar.open("Registration success!", "OK", {
      duration: 2000
    });
  }

}
