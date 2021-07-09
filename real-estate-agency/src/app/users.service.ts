import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getAll() {
    return this.http.post(`${this.uri}/allUsers`, null);
  }

  constructor(private http: HttpClient) { }
}
