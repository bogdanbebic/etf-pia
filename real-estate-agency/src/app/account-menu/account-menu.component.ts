import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { UserRoles } from '../user-roles.enum';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  isUserLoggedIn: boolean;
  isUser: boolean;
  isAgent: boolean;
  isAdmin: boolean;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authorizationService.currentUserRoleSubject.subscribe((userRole: UserRoles) => {
      this.isUserLoggedIn = userRole != UserRoles.Unregistered;
      this.isUser = userRole == UserRoles.Registered;
      this.isAgent = userRole == UserRoles.Agent;
      this.isAdmin = userRole == UserRoles.Admin;
    });
  }

  logout() {
    this.authorizationService.logout();
  }

}
