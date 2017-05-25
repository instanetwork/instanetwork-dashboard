import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {AuthenticationService} from './index';
import {User} from '../_models/user';

@Injectable()
export class UserService {
  private token: string;
  // private url = 'https://instanetwork.herokuapp.com/';
  private url = 'http://localhost:3001/';
  private tokenUrl = '?token=';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    // get users from api
    return this.http.get('/api/users', options)
      .map((response: Response) => response.json());
  }

  changePassword(password): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'password/change_password/' + id + this.tokenUrl + session, {'password': password}, options).map(res => res.json());
  }

  resetPassword(email) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'password/reset_password/' + email, {}, options).map(res => res.json());
  }

  addStripeSubscription(stripe_token, insta_package, coupon): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'stripe/start/' + id + this.tokenUrl + session, {'token': stripe_token, 'package' : insta_package, 'coupon': coupon}, options).map(res => res.json());
  }

  getSubscriptionPackage() {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.http.get(this.url + 'users/package/'+ id + this.tokenUrl + session).map(res => res.json());
  }

  upgradeSubscription(insta_package): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'stripe/change/' + id + this.tokenUrl + session, {'package' : insta_package}, options).map(res => res.json());
  }

  cancelSubscription(): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'stripe/cancel/' + id + this.tokenUrl + session, {}, options).map(res => res.json());
  }
}
