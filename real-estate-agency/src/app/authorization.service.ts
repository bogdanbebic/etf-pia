import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedInUser } from './logged-in-user';
import { UserRoles } from './user-roles.enum';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      if (user)
        this.currentUserRoleSubject.next(user.role);
    });

    return currentUserSubject;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.currentUserRoleSubject.next(UserRoles.Unregistered);
    this.router.navigate(['/']);
  }

  isAuthenticated(roles: UserRoles[]): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.currentUser = user;
      this.currentUserRoleSubject.next(user.role);
    }
    return this.currentUser && roles.includes(this.currentUser.role) ||
      !this.currentUser && roles.includes(UserRoles.Unregistered);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
}
