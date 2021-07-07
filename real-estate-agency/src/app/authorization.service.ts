import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedInUser } from './logged-in-user';
import { UserRoles } from './user-roles.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  uri = 'http://localhost:4000';

  currentUser: LoggedInUser;
  currentUserRoleSubject = new Subject<UserRoles>();

  login(username: string, password: string) {
    const response = this.http.post(`${this.uri}/login`, { username: username, password: password });

    const currentUserSubject = new Subject<LoggedInUser>();
    response.subscribe(currentUserSubject);

    currentUserSubject.subscribe((user: LoggedInUser) => {
      this.currentUser = user;
      if (user)
        this.currentUserRoleSubject.next(user.role);
    });

    return currentUserSubject;
  }

  logout() {
    this.currentUser = null;
    this.currentUserRoleSubject.next(UserRoles.Unregistered);
  }

  isAuthenticated(roles: UserRoles[]): boolean {
    return this.currentUser && roles.includes(this.currentUser.role);
  }

  constructor(private http: HttpClient) { }
}
