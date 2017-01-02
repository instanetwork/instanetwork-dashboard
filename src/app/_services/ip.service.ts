import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Ip} from '../_models/ip';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IpService {
  private url = 'https://instanetwork.herokuapp.com/ip/';

  constructor(private http: Http) {

  }

  getIpInfo(ip): Observable<Ip> {
    return this.http.get(this.url + ip).map(res => res.json());
  }

  getLowestIp(): Observable<Ip> {
    return this.http.get(this.url).map(res => res.json());
  }

  incrementIp(ip): Observable<Ip[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'increment/' + ip, {}, options).map(res => res.json());
  }

}
