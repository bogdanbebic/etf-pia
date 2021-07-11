import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  uri = 'http://localhost:4000';

  newRealEstate(realEstateData) {
    return this.http.post(`${this.uri}/real-estate-new`, realEstateData);
  }

  getRealEstate(id: string) {
    return this.http.post(`${this.uri}/real-estate-get`, { _id: id });
  }

  getAll() {
    return this.http.post(`${this.uri}/real-estates-list`, null);
  }

  getOwned(username: string) {
    return this.http.post(`${this.uri}/owned`, { username: username });
  }

  getPromoted() {
    return this.http.post(`${this.uri}/promoted`, null);
  }

  getUnapproved() {
    return this.http.post(`${this.uri}/unapproved`, null);
  }

  addToPromoted(id) {
    return this.http.post(`${this.uri}/real-estate-promoted-add`, { _id: id });
  }

  removeFromPromoted(id) {
    return this.http.post(`${this.uri}/real-estate-promoted-remove`, { _id: id });
  }

  approveRealEstate(id) {
    return this.http.post(`${this.uri}/real-estate-approve`, { _id: id });
  }

  rejectRealEstate(id) {
    return this.http.post(`${this.uri}/real-estate-reject`, { _id: id });
  }

  search(nameQuery: string, priceLow: number, priceHigh: number) {
    const body = {
      nameQuery: nameQuery,
      priceLow: priceLow,
      priceHigh: priceHigh,
    };

    return this.http.post(`${this.uri}/search`, body);
  }

  constructor(private http: HttpClient) { }
}
