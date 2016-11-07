import {Http, Headers} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';

@Injectable()
export class SubscriptionService {


  constructor(private http: Http){

  }

  getEntries() {
    return this.http.get('https://instanetwork.herokuapp.com/subscription/1').map(res => res.json());
  }
}
