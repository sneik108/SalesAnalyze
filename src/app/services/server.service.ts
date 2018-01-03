import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IFeatureScoreModel } from '../interfaces/IFeatureScoreModel';

@Injectable()
export class ServerService {
  // pathToData: '../'

  private pathToApi = 'http://migvisor.kruts.net:8080/migvisor/';

  private headers: Headers;

  constructor(private http: Http) {
    let authHeaderKey = 'Authorization';
    let authHeaderValue = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNaWd2aXNvciIsInN1YiI6InVzZXIiLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MTQ3NDk0NDIsImV4cCI6MTUxNDc1MTI0Mn0.eP5DkAFaXnD4F_Fck8AGN0sSKzrhKxmsUVqDH2VfCiWo-3AIf96YPfM89mxuOsgmK9u4bADvNJVJx2gMUGwYFw';

    let contentTypeKey = 'Content-Type';
    let contentTypeValue = 'application/json';
    this.headers = new Headers();
    this.headers.append(authHeaderKey, authHeaderValue);
    this.headers.append(contentTypeKey, contentTypeValue);

  }



  getServerList() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'servers-list', options);
  }

  getServersListExceptFeatures(features) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.pathToApi + 'servers-except-features', features);
  }

  getServersByCostRestrict(cost: number){
    let srchParams = new URLSearchParams();
    srchParams.append("scoreValue", cost.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get(this.pathToApi + 'saving-servers', options);
  }

  getServer(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('server', options);
  }

  getServerWithScore(id){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'server-with-score/' + id.toString(), options);
  }

  getSortedServersByScore(){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'servers-sort-by-score/', options);
  }

  getServerWithCost(id){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'server-with-cost/' + id.toString(), options);
  }

  getMostExpensiverServers(count: number){
    let srchParams = new URLSearchParams();
    srchParams.set("count", count.toString());
    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get(this.pathToApi + 'most-expensive-servers', options);
  }

  getFilteredServers(parameters: any){
    let options = new RequestOptions({headers: this.headers});
    return this.http.post(this.pathToApi + 'filter-servers', parameters);
  }

  getInstanceList() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'instances-list', options);
  }

  getInstance(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('instance', options);
  }

  getInstancesByServerId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("server-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('instance', options);
  }

  getFeaturesList() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'features-list', options);
  }

  getFeature(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('feature', options);
  }

  getFeaturesByInstanceId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("instance-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('instance', options);
  }

  updateFeatureScore(data: IFeatureScoreModel) {
    return this.http.post('feature', data);
  }

  getDatabasesList() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'databases-list', options);
  }

  getDatabase(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('database', options);
  }

  getDatabasesByInstanceId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("instance-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('database', options);
  }

  getSubFeature(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('sub-feature', options);
  }

  getSubFeaturesByInstanceId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("feature-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('sub-feature', options);
  }

  getSubFeatureObject(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('sub-feature-object', options);
  }

  getSubFeatureObjectsByInstanceId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("sub-feature-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('sub-feature-object', options);
  }

  getTagsList() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'tags-list', options);
  }

  getTag(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('tag', options);
  }

  getTagsByInstanceId(id: number) {
    let srchParams = new URLSearchParams();
    srchParams.append("database-id", id.toString());

    let options = new RequestOptions({ headers: this.headers, params: srchParams });
    return this.http.get('tag', options);
  }

  getAvailableCpu(){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'available-cpu', options);
  }

  getAvailableOracleVersions(){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.pathToApi + 'available-oracle-version', options);
  }

  getAllServers() {
    let options = new RequestOptions({ headers: this.headers });
    let pathUrl = this.pathToApi + 'servers';
    return this.http.get(pathUrl, options);
  }

  getServers() {
    const serverDataUrl = 'assets/servers.json';
    return this.http.get(serverDataUrl)
      .map(x => x.json());
  }
}
