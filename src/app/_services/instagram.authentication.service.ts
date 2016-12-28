import {Http, URLSearchParams} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InstagramAuthenticationService {
  private url = 'https://instanetwork.herokuapp.com/hashtags?';
  constructor(private http: Http){

  }

  validateInstagramUser(username, password): Observable<boolean> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    return this.http.get(this.url, {search: params}).map(res => res.json());
  }
}
