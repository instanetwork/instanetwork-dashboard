import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Profile} from '../_models/profile';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  private url = 'https://instanetwork.herokuapp.com/profile/';
  private tokenUrl = '?token=';

  constructor(private http: Http) {

  }

  getProfile(): Observable<Profile[]> {
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.get(this.url + id + this.tokenUrl + session).map(res => res.json());
  }

  stopService(): Observable<Profile[]> {
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'stop/' + id + this.tokenUrl + session, {}, options).map(res => res.json());
  }

  startService(tags, username, password, ip, follow, like): Observable<Profile[]> {
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'start/' + id + this.tokenUrl + session, {
      'tags': tags,
      'username': username,
      'password': password,
      'ip': ip,
      'follow': follow,
      'like': like,
    }, options).map(res => res.json());
  }
}
