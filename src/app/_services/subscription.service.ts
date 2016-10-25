import {Http, Response} from '@angular/http'
import {Injectable} from '@angular/core'

@Injectable()
export class SubscriptionService {

  http:Http;
  constructor(http:Http){
    this.http = http;
  }

  getEntries(){
    return this.http.get('https://instanetwork.herokuapp.com/subscription/1').map((res: Response) => res.json());
  }
}
