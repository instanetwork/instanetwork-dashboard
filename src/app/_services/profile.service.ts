import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Profile} from '../_models/profile';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  private url = 'https://instanetwork.herokuapp.com/profile/';
  private id = JSON.parse(localStorage.getItem('currentUser')).id;

  constructor(private http: Http) {

  }

  getProfile(): Observable<Profile[]> {
    return this.http.get(this.url + this.id).map(res => res.json());
  }

  stopService(): Observable<Profile[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'stop/' + this.id, {}, options).map(res => res.json());
  }

  startService(tags, username, password, ip): Observable<Profile[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'start/' + this.id, {'tags' : tags, 'username' : username, 'password' : password, 'ip' : ip}, options).map(res => res.json());
  }
}
