import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
// var jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // var token = jwt.sign({id: currentUser.id, username: currentUser.username}, 'FyluecqktiLYBwlV8jex');
      // console.log(token);
      // console.log(currentUser);
      // if (token == currentUser.token) {
        // logged in so return true
        return true;
      // }
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
