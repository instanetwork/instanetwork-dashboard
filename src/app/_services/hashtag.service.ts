import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Hashtag} from '../_models/hashtag';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HashtagService {
  private url = 'https://instanetwork.herokuapp.com/hashtags/';
  private tokenUrl = '?token=';

  constructor(private http: Http) {

  }

  getHashtags(): Observable<Hashtag[]> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    return this.http.get(this.url + id + this.tokenUrl + session).map(res => res.json());
  }

  setHashtags(tags): Observable<boolean> {
    let id = JSON.parse(localStorage.getItem('currentUser')).id;
    let session = JSON.parse(localStorage.getItem('currentUser')).token;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'set/' + id + this.tokenUrl + session, {'tags': tags}, options).map(res => res.json());
  }
}
