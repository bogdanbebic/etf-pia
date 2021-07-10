import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000';

  register(newUserData) {
    return this.http.post(`${this.uri}/register`, newUserData);
  }

  registerAccept(username: string) {
    return this.http.post(`${this.uri}/registration-accept`, { username: username });
  }

  registerReject(username: string) {
    return this.http.post(`${this.uri}/registration-reject`, { username: username });
  }

  deleteUser(username: string) {
    return this.http.post(`${this.uri}/user-delete`, { username: username });
  }

  changeUserData(username: string, userData: UserData) {
    return this.http.post(`${this.uri}/user-data-change`, { username: username, ...userData });
  }

  getUser(username: string) {
    return this.http.post(`${this.uri}/get-user`, { username: username });
  }

  getAll() {
    return this.http.post(`${this.uri}/allUsers`, null);
  }

  constructor(private http: HttpClient) { }
}
