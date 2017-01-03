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
  invalidEmail = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  register() {

    // Validate Passwords are same
    this.passwords = this.model.password != this.model.repeatPassword
    this.invalidEmail = this.isInvalidMailFormat(this.model.email);
  }

  isInvalidMailFormat(email) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return (email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email)));
  }
}
