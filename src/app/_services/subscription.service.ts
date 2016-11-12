import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Subscription} from '../_models/subscription';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SubscriptionService {
  private url = 'https://instanetwork.herokuapp.com/subscription/';
  private id = JSON.parse(localStorage.getItem('currentUser')).id;
  constructor(private http: Http){

  }

  getEntries(): Observable<Subscription[]> {
    return this.http.get(this.url + this.id).map(res => res.json());
  }

  addTrial(): Observable<Subscription[]> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'trial/' + this.id,{},options).map(res => res.json());
  }
}
