import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Subscription} from '../_models/subscription';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SubscriptionService {
  private url = 'https://instanetwork.herokuapp.com/subscription/';
  private tokenUrl = '?token=';

  constructor(private http: Http) {

  }

  getEntries(): Observable<Subscription[]> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.http.get(this.url + id + this.tokenUrl + session).map(res => res.json());
  }

  hasActive(): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.http.get(this.url + 'active/' + id + this.tokenUrl + session).map(res => res.json());
  }

  addTrial(): Observable<Subscription[]> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'trial/' + id + this.tokenUrl + session, {}, options).map(res => res.json());
  }
}
