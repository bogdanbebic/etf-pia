import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  uri = 'http://localhost:4000';

  getProfilePicture(username: string) {
    return this.http.post(
      `${this.uri}/download-profile-picture`,
      { username: username },
      {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  constructor(private http: HttpClient) { }
}
