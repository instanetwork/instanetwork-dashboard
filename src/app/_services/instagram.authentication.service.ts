import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginResult} from '../_models/login.result';

@Injectable()
export class InstagramAuthenticationService {
  private url = 'https://instanetwork.herokuapp.com/instagram/';
  private tokenUrl = '?token=';

  constructor(private http: Http) {

  }

  validateInstagramUser(username, password, ip, port, proxyUsername, proxyPassword): Observable<LoginResult> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + id + this.tokenUrl + session, {
      'username': username,
      'password': password,
      'ip': ip,
      'port': port,
      'proxyUsername': proxyUsername,
      'proxyPassword': proxyPassword
    }, options).map(res => res.json());
  }
}
