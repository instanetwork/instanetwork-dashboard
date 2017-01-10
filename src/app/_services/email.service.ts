import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmailService {
  private api_url = 'https://api.mailgun.net/v3/instanetwork.ca/messages';
  private api_key = 'key-a7055f973b8bd092af3f869af2f2999d';
  private from = 'support@instanetwork.ca;';
  private reply_to = 'support@instanetwork.ca;';

  constructor(private http: Http) {

  }

  registerEmail(email): Observable<boolean> {
    let headers = new Headers({"Authorization": "Basic " + btoa("api:key-a7055f973b8bd092af3f869af2f2999d")});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.api_url, {
      from: this.from,
      to: email,
      subject: "Welcome to Instanetwork",
      html: ``
    }, options).map(res => res.json());
  }

  resetPasswordEmail(email, password) {
    let headers = new Headers({"Authorization": "Basic " + btoa("api:key-a7055f973b8bd092af3f869af2f2999d")});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.api_url, {
      from: this.from,
      to: email,
      subject: "Instanetwork Password Reset",
      text: password
    }, options).map(res => res.json());
  }
}
