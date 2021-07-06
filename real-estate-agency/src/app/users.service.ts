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

  constructor(private http: HttpClient) { }
}
