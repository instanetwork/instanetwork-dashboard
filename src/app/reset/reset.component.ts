import {Component, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator} from '../theme/validators';
import {AuthenticationService} from '../_services/index';
import {UserService} from '../_services/user.service';
import {ReCaptchaComponent} from 'angular2-recaptcha/lib/captcha.component';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
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

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService, private userService: UserService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;

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
              console.log("hey");
              this.resetPassword(values['email']);
            } else {
              this.loading = false;
              this.captcha.reset();
              this.emailExist = false;
            }
          },
          (err) => {
            this.loading = false;
            this.captcha.reset();
            this.error = "Unable to reset password, please try again later.";
          }
        );
    }
  }

  emailChanged(event: KeyboardEvent) {
    this.emailExist = true;
  }

  resetPassword(email) {
    this.userService.resetPassword(email).subscribe(result => {
      console.log(result + " " + result.email + " " + result.password);
        if (typeof result.email !== 'undefined' && typeof result.password !== 'undefined' && result.email === true) {
          this.alertUserReset();
          this.loading = false;
          this.captcha.reset();
        } else {
          this.loading = false;
          this.emailExist = false;
          this.captcha.reset();
        }
      },
      (err) => {
        this.captcha.reset();
        this.loading = false;
        this.error = "Unable to reset password, please try again later.";
      }
    );
  }

  alertUserReset() {
    this.modal.alert()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Completed')
      .titleHtml('Instanetwork Service')
      .okBtnClass('btn btn-success')
      .body('A temporary password has been sent to the email associated with the account.')
      .open()
      .then(dialog => dialog.result)
      .then(result => {
        this.router.navigate(['/login']);
      })
      .catch((ex) => {
      });
  }
}
