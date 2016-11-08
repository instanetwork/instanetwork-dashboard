import {Http, Headers} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Subscription} from '../_models/subscription';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SubscriptionService {

  constructor(private http: Http){

  }

  getEntries(): Observable<Subscription[]> {
    return this.http.get('https://instanetwork.herokuapp.com/subscription/1').map(res => res.json());
  }
}
