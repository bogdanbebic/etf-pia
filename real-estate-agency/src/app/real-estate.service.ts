import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  uri = 'http://localhost:4000';

  getPromoted() {
    return this.http.post(`${this.uri}/promoted`, null);
  }

  getUnapproved() {
    return this.http.post(`${this.uri}/unapproved`, null);
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
