import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class SourceService {

  private pathToApi = 'http://localhost:55757/api/values/';
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) {
    // Website you wish to allow to connect
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:55757');

    // Request methods you wish to allow
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    this.options = new RequestOptions({ headers: this.headers });
  }

  /*Customers*/
  customersCount() {
    return this.http.get(this.pathToApi + 'customers/count', this.options);
  }

  avgSalePointsOnCustomer() {
    return this.http.get(this.pathToApi + 'customers/avgSalePointsOnCustomer', this.options);
  }

  avgProductCountOnCustomer() {
    return this.http.get(this.pathToApi + 'customers/avgProductCountOnCustomer', this.options);
  }

  avgSumOnCustomer() {
    return this.http.get(this.pathToApi + 'customers/avgSumOnCustomer', this.options);
  }

  /*Top customers*/
  topByProductQuantity(count: number) {
    return this.http.get(this.pathToApi + 'customers/topByProductQuantity/' + count.toString(), this.options);
  }

  topBySalesPoints(count: number) {
    return this.http.get(this.pathToApi + 'customers/topBySalesPoints/' + count.toString(), this.options);
  }

  topByProductsVariety(count: number) {
    return this.http.get(this.pathToApi + 'customers/topByProductsVariety/' + count.toString(), this.options);
  }

  topBySum(count: number) {
    return this.http.get(this.pathToApi + 'customers/topBySum/' + count.toString(), this.options);
  }
  /*Sales*/
  soldProductsQuantity() {
    return this.http.get(this.pathToApi + 'sales/soldProductsQuantity', this.options);
  }

  soldProductsSum() {
    return this.http.get(this.pathToApi + 'sales/soldProductsSum', this.options);
  }

  avgPrice() {
    return this.http.get(this.pathToApi + 'sales/avgPrice', this.options);
  }

  transactionsPerDay() {
    return this.http.get(this.pathToApi + 'sales/transactionsPerDay', this.options);
  }

  allSalesForYear(year: number) {
    return this.http.get(this.pathToApi + 'sales/allSalesForYear/' + year.toString(), this.options);
  }

  salesBySaleChannels() {
    return this.http.get(this.pathToApi + 'sales/salesBySaleChannels/', this.options);
  }

}
