import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { UserData } from '../user-data';
import { UserRoles } from '../user-roles.enum';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  isUser: boolean;
  firstname: string;
  lastname: string;
  city: string;
  country: string;

  constructor(
    private authorizationService: AuthorizationService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userRole = this.authorizationService.currentUser.role;
    const username = this.authorizationService.currentUser.username;

    this.isUser = userRole == UserRoles.Registered;

    this.usersService.getUser(username).subscribe((user: UserData) => {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.city = user.city;
      this.country = user.country;
    });
  }

  changeUserData() {
    const username = this.authorizationService.currentUser.username;
    const userData = {
      firstname: this.firstname,
      lastname: this.lastname,
      city: this.city,
      country: this.country,
    };

    this.usersService.changeUserData(username, userData).subscribe(ok => {
      this.getUser();
    });
  }

}
