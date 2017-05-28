import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Promotion} from '../_models/promotion';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PromotionService {
  private url = 'https://instanetwork.herokuapp.com/';

  private tokenUrl = '?token=';

  constructor(private http: Http) {

  }

  getPromo(promo): Observable<Promotion> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.http.get(this.url + 'promotions/' + promo + this.tokenUrl + session + '&user_id=' + id).map(res => res.json());
  }
}
