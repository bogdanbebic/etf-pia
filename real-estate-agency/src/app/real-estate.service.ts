import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  uri = 'http://localhost:4000';

  acceptOffer(id: string, username: string) {
    const body = {
      _id: id,
      username: username,
    };
    return this.http.post(`${this.uri}/real-estate-accept`, body);
  }

  buy(id: string, username: string) {
    const body = {
      _id: id,
      username: username,
    };
    return this.http.post(`${this.uri}/real-estate-buy`, body);
  }

  rent(id: string, username: string, dateFrom, dateTo) {
    const body = {
      _id: id,
      username: username,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    return this.http.post(`${this.uri}/real-estate-rent`, body);
  }

  getRealEstatePicturePaths(id: string) {
    return this.http.post(`${this.uri}/real-estate-picture-paths`, { _id: id });
  }

  newRealEstate(realEstateFormData) {
    return this.http.post(`${this.uri}/real-estate-new`, realEstateFormData);
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

  getDashboardPerCityData() {
    return this.http.post(`${this.uri}/dashboard-real-estate-per-city`, null);
  }

  getDashboardHousesRentSaleData() {
    return this.http.post(`${this.uri}/dashboard-houses-rent-sale`, null);
  }

  getDashboardApartmentsRentSaleData() {
    return this.http.post(`${this.uri}/dashboard-apartments-rent-sale`, null);
  }

  getDashboardPricesData() {
    return this.http.post(`${this.uri}/dashboard-real-estate-per-price`, null);
  }

  constructor(private http: HttpClient) { }
}
