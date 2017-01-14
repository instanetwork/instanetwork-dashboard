import {Http, Headers, RequestOptions} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Hashtag} from '../_models/hashtag';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HashtagService {
  private url = 'https://instanetwork.herokuapp.com/hashtags/';
  private id = JSON.parse(localStorage.getItem('currentUser')).id;
  session = JSON.parse(localStorage.getItem('currentUser')).token;
  private tokenUrl = '?token=';

  constructor(private http: Http){

  }

  getHashtags(): Observable<Hashtag[]> {
    return this.http.get(this.url + this.id + this.tokenUrl + this.session).map(res => res.json());
  }

  setHashtags(tags): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    console.log(tags);
    return this.http.post(this.url + 'set/' + this.id + this.tokenUrl + this.session,{'tags' : tags},options).map(res => res.json());
  }
}
