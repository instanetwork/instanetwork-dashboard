﻿import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthenticationService} from './index';
import {User} from '../_models/user';

@Injectable()
export class UserService {
  private token: string;
  private url = 'https://instanetwork.herokuapp.com/';
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
    var id = JSON.parse(localStorage.getItem('currentUser')).id;
    var session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'password/change_password/' + id + this.tokenUrl + session, {'password': password}, options).map(res => res.json());
  }

  resetPassword(email) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'password/reset_password/' + email, {}, options).map(res => res.json());
  }
}
