import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AuthenticationService} from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./register.scss')],
  template: require('./register.html'),
})
export class RegisterComponent {

  model: any = {};
  loading = false;
  error = '';
  passwords = true;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  register() {

    // Validate Passwords are same
    if (this.model.password != this.model.repeatPassword) {
      console.log("invalid");
      this.passwords = false;
      return;
    } else {
      console.log("valid");
      this.passwords = true;
    }
  }
}
