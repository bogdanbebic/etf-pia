import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedInUser } from './logged-in-user';
import { UserRoles } from './user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  uri = 'http://localhost:4000';

  currentUser: LoggedInUser;

  login(username: string, password: string) {
    const response = this.http.post(`${this.uri}/login`, { username: username, password: password });
    response.subscribe((user: LoggedInUser) => this.currentUser = user);
    return response;
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated(roles: UserRoles[]): boolean {
    return this.currentUser && roles.includes(this.currentUser.role);
  }

  constructor(private http: HttpClient) { }
}
