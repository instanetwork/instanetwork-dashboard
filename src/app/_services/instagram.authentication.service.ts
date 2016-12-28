import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginResult} from '../_models/login.result';

@Injectable()
export class InstagramAuthenticationService {
  private url = 'http://localhost:8080/validate';

  constructor(private http: Http) {

  }

  validateInstagramUser(username, password, ip, port, proxyUsername, proxyPassword): Observable<LoginResult> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('properties', username + "," + password + "," + ip + "," + port + "," + proxyUsername + "," + proxyPassword);
    return this.http.get(this.url, {search: params}).map(res => res.json());
  }
}
