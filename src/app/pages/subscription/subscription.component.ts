import {Component, ViewEncapsulation, Renderer, ViewContainerRef} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'subscription',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./subscription.scss')],
  template: require('./subscription.html')
})
export class Subscription {
  readonly subscribeString: string = 'Subscribe';
  readonly cancelString: string = 'Cancel';
  readonly upgradeString: string = 'Upgrade';
  readonly downgradeString: string = 'Downgrade';
  readonly primaryString: string = 'Primary';
  readonly premiumString: string = 'Premium';
  readonly businessString: string = 'Business';
  readonly businessCost: number = 10000;
  readonly premiumCost: number = 8000;
  readonly primaryCost: number = 6000;

  private currentUser: number;
  private globalListener: any;
  private busButton: string = 'Subscribe';
  private preButton: string = 'Subscribe';
  private priButton: string = 'Subscribe';

  constructor(private renderer: Renderer, private userService: UserService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private openCheckoutBusiness() {
    if (this.busButton === this.subscribeString) {
      this.checkout(this.businessCost, this.businessString);
    } else if (this.busButton === this.cancelString) {
      this.cancel(this.businessString);
    } else {
      this.change(this.businessString);
    }
  }

  private openCheckoutPremium() {
    if (this.preButton === this.subscribeString) {
      this.checkout(this.premiumCost, this.premiumString);
    } else if (this.preButton === this.cancelString) {
      this.cancel(this.premiumString);
    } else {
      this.change(this.premiumString);
    }
  }

  private openCheckoutPrimary() {
    if (this.priButton === this.subscribeString) {
      this.checkout(this.primaryCost, this.primaryString);
    } else if (this.priButton === this.cancelString) {
      this.cancel(this.primaryString);
    } else {
      this.change(this.primaryString);
    }
  }

  private cancel(pack) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Instanetwork Subscription')
      .body('Are you sure you want to cancel your ' + pack + ' subscription?')
      .okBtn('Yes')
      .okBtnClass('btn btn-success')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-danger')
      .open()
      .then(dialog => dialog.result)
      .then(result => {
        this.cancelSubscription(pack);
      })
      .catch((ex) => {
      });
  }

  private change(pack) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Instanetwork Subscription')
      .body('Are you sure you want to change your subscription to ' + pack + '?')
      .okBtn('Yes')
      .okBtnClass('btn btn-success')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-danger')
      .open()
      .then(dialog => dialog.result)
      .then(result => {
        this.changeSubscription(pack);
      })
      .catch((ex) => {
      });
  }

  private checkout(price, pack) {
    var me = this;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_rgv209vKtNJJOruFdt12meDo',
      locale: 'auto',
      token: function (token: any) {
        console.log("hey " + token.id);
        me.userService.addStripeAndCharge(token.id, pack)
          .subscribe(result => {
              if (result) {
                me.alertUserSubscriptionComplete('A subscription was successfully added to your account!', 'btn btn-success');
                me.updatebuttons(pack);
              } else {
                me.alertUserSubscriptionComplete('There was an error with your subscription, please check no charge was applied and contact support if necessary', 'btn btn-danger');
              }
            },
            (err) => {
              me.alertUserSubscriptionComplete('There was an error with your subscription, please check no charge was applied and contact support if necessary', 'btn btn-danger');
            }
          );
      }
    });

    handler.open({
      name: 'INSTANETWORK INC',
      description: pack + 'Package',
      amount: price,
      image: './assets/img/stripe_logo.jpg',
      currency: 'cad'
    });

    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }

  private alertUserSubscriptionComplete(body, btn) {
    this.modal.alert()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Completed')
      .titleHtml('Instanetwork Subscription')
      .okBtnClass(btn)
      .body(body)
      .open()
  }

  private updatebuttons(pack) {
    if (pack === this.primaryString) {
      this.priButton = this.cancelString;
      this.preButton = this.upgradeString;
      this.busButton = this.upgradeString;
    } else if (pack === this.premiumString) {
      this.priButton = this.downgradeString;
      this.preButton = this.cancelString;
      this.busButton = this.upgradeString;
    } else if (pack === this.businessString) {
      this.priButton = this.downgradeString;
      this.preButton = this.downgradeString;
      this.busButton = this.cancelString;
    } else {
      this.priButton = this.subscribeString;
      this.preButton = this.subscribeString;
      this.busButton = this.subscribeString;
    }
  }

  private cancelSubscription(pack) {
    this.userService.cancelSubscription()
      .subscribe(result => {
          if (result) {
            this.alertUserSubscriptionComplete('The subscription for ' + pack + ' was successfully Cancelled, ', 'btn btn-success');
            this.updatebuttons('');
          } else {
            this.alertUserSubscriptionComplete('There was an error with cancelling your subscription, please contact support or try again!', 'btn btn-danger');
          }
        },
        (err) => {
          this.alertUserSubscriptionComplete('There was an error with cancelling your subscription, please contact support or try again!', 'btn btn-danger');
        }
      );
  }

  private changeSubscription(pack) {
    this.userService.upgradeSubscription(pack)
      .subscribe(result => {
          if (result) {
            this.alertUserSubscriptionComplete('The subscription was successfully changed to ' + pack + '!', 'btn btn-success');
            this.updatebuttons(pack);
          } else {
            this.alertUserSubscriptionComplete('There was an error with changing your subscription, please contact support or try again!', 'btn btn-danger');
          }
        },
        (err) => {
          this.alertUserSubscriptionComplete('There was an error with changing your subscription, please contact support or try again!', 'btn btn-danger');
        }
      );
  }
}
