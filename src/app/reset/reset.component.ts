import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../theme/validators';
import {AuthenticationService} from '../_services/index';
import {ReCaptchaComponent} from 'angular2-recaptcha/lib/captcha.component';
import {EmailService} from '../_services/email.service';
import {Router} from '@angular/router';

@Component({
  selector: 'reset',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./reset.scss')],
  template: require('./reset.html'),
})

export class ResetComponent {

  @ViewChild(ReCaptchaComponent) captcha:ReCaptchaComponent;

  public form: FormGroup;
  public email: AbstractControl;
  public emailExist: boolean = true;
  public submitted: boolean = false;
  private error: string = '';
  private loading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService, private emailService: EmailService) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])]
    });

    this.email = this.form.controls['email'];
  }

  public onSubmit(values: Object): void {
    this.emailExist = true;
    this.submitted = true;
    this.error = "";
    if (this.form.valid && this.captcha.getResponse()) {
      this.loading = true;
      this.authenticationService.checkEmail(values['email'])
        .subscribe(result => {
            if (result === true) {
              console.log("continue");
              this.loading = false;
            } else {
              this.loading = false;
              this.emailExist = false;
            }
          },
          (err) => {
            this.loading = false;
            this.error = "Unable to register, please try again later.";
          }
        );
    }
  }

  emailChanged(event: KeyboardEvent) {
    this.emailExist = true;
  }
}
