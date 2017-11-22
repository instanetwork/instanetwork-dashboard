import {Component, ViewEncapsulation, Renderer, ViewContainerRef} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {SubscriptionService} from '../../_services/subscription.service';
import {PromotionService} from '../../_services/promotion.service';

@Component({
  selector: 'subscription',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./subscription.scss')],
  template: require('./subscription.html')
})
export class Subscription {
  readonly stripeProdKey: string = 'pk_live_6AYHDN4oEUxc2iOUNTA5cSyc';
  readonly stripeTestKey: string = 'pk_test_rgv209vKtNJJOruFdt12meDo';
  readonly subscribeString: string = 'Subscribe';
  readonly cancelString: string = 'Cancel';
  readonly upgradeString: string = 'Upgrade';
  readonly downgradeString: string = 'Downgrade';
  readonly primaryString: string = 'Primary';
  readonly premiumString: string = 'Premium';
  readonly businessString: string = 'Business';
  readonly businessCost: number = 59;
  readonly premiumCost: number = 39;
  readonly primaryCost: number = 19;

  private currentUser: number;
  private globalListener: any;
  private busButton: string = '';
  private preButton: string = '';
  private priButton: string = '';
  private effDate: string = '';
  private maxDate: Date;
  private offsetMaxDate: Date;
  private promoApplied: boolean = false;
  private inputValue: string = '';

  private businessTotalCost: number = 5900;
  private premiumTotalCost: number = 3900;
  private primaryTotalCost: number = 1900;
  private businessViewCost: number = 59;
  private premiumViewCost: number = 39;
  private primaryViewCost: number = 19;
  private businessPromoApplied: boolean = false;
  private premiumPromoApplied: boolean = false;
  private primaryPromoApplied: boolean = false;
  private coupon: string = '';


  constructor(private renderer: Renderer, private userService: UserService, private subscriptionService: SubscriptionService, private promotionService: PromotionService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.priButton = this.subscribeString;
    this.preButton = this.subscribeString;
    this.busButton = this.subscribeString;
    this.effectiveDate();
  }

  private effectiveDate() {
    this.subscriptionService.getEndDate()
      .subscribe(result => {
          if (result != "") {
            var today = new Date();
            var maxDate = new Date(result);
            this.maxDate = maxDate;
            console.log(today);
            console.log(maxDate);
            if (maxDate >= today) {
              this.offsetMaxDate = this.maxDate;
              this.offsetMaxDate.setHours(this.maxDate.getHours() - 1);
              this.effDate = 'Effective date of ' + maxDate.getUTCFullYear() + "-" + (maxDate.getUTCMonth() + 1) + "-" + (maxDate.getUTCDate() + 1);
            } else {
              this.effDate = '';
            }
            this.getPackage();
          }
        },
        (err) => {
        }
      );
  }

  newItemChanged(event: KeyboardEvent): void {
    const target = <HTMLInputElement> event.target;
    this.inputValue = target.value;
    if (event.keyCode == 13) {
      this.promoClicked();
    }
  }

  private promoClicked() {
    if (this.inputValue === ''){
      return;
    }

    this.promotionService.getPromo(this.inputValue)
      .subscribe(result => {
          if (result) {
            console.log(result.value);
            if (result.package === this.businessString) {
              this.setBusinessDiscount(result.value);
            } else if (result.package === this.premiumString) {
              this.setPremiumDiscount(result.value);
            } else if (result.package === this.primaryString) {
              this.setPrimaryDiscount(result.value);
            } else if (result.package === 'all') {
              this.setBusinessDiscount(result.value);
              this.setPremiumDiscount(result.value);
              this.setPrimaryDiscount(result.value);
            }
            console.log(result);
            this.coupon = result.promocode;
            this.promoApplied = true;

            this.alertUserSubscriptionComplete('Promo code: ' + result.description + ' was applied', 'btn btn-success');
          } else {
            this.alertUserSubscriptionComplete('Promo code does not exist', 'btn btn-danger');
          }
        },
        (err) => {
          if(err.status === 404) {
            this.alertUserSubscriptionComplete('Promo code does not exist', 'btn btn-danger');
          } else {
            this.alertUserSubscriptionComplete('There was an error with your promo code, try again or contact support', 'btn btn-danger');
          }
          console.log("tesasdft " + err.status);
        }
      );
  }

  private getPackage() {
    this.userService.getSubscriptionPackage()
      .subscribe(result => {
          if (result) {
            this.updatebuttons(result.package);
          } else {
          }
        },
        (err) => {
        }
      );
  }

  private openCheckoutBusiness() {
    if (this.busButton === this.subscribeString) {
      this.checkout(this.businessTotalCost, this.businessString);
    } else if (this.busButton === this.cancelString) {
      this.cancel(this.businessString);
    } else {
      this.change(this.businessString);
    }
  }

  private openCheckoutPremium() {
    if (this.preButton === this.subscribeString) {
      this.checkout(this.premiumTotalCost, this.premiumString);
    } else if (this.preButton === this.cancelString) {
      this.cancel(this.premiumString);
    } else {
      this.change(this.premiumString);
    }
  }

  private openCheckoutPrimary() {
    if (this.priButton === this.subscribeString) {
      this.checkout(this.primaryTotalCost, this.primaryString);
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
    if (this.effDate == '' || new Date() >= this.offsetMaxDate) {
      this.subscribe(price, pack, 'A subscription was successfully added to your account!');
    } else {
      this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(true)
        .keyboard(27)
        .title('Save')
        .titleHtml('Instanetwork Subscription')
        .body('You will not be charged till the last day of your current subscription')
        .okBtn('Continue')
        .okBtnClass('btn btn-success')
        .cancelBtn('Cancel')
        .cancelBtnClass('btn btn-danger')
        .open()
        .then(dialog => dialog.result)
        .then(result => {
          this.subscribe(price, pack, 'A subscription was successfully added to your account! You will not be charged till the last day of your current subscription');
        })
        .catch((ex) => {
        });
    }
  }

  private subscribe(price, pack, acceptedText) {
    var me = this;
    var handler = (<any>window).StripeCheckout.configure({
      key: this.stripeProdKey,
      locale: 'auto',
      token: function (token: any) {
        me.userService.addStripeSubscription(token.id, pack, me.coupon)
          .subscribe(result => {
              if (result) {
                me.alertUserSubscriptionComplete(acceptedText, 'btn btn-success');
                me.updatebuttons(pack);
              } else {
                me.alertUserSubscriptionComplete('There was an error with your subscription, please try again or contact support', 'btn btn-danger');
              }
            },
            (err) => {
              if(err.status === 402) {
                console.log(err);
                me.alertUserSubscriptionComplete(err._body, 'btn btn-danger');
              } else {
                console.log(err);
                me.alertUserSubscriptionComplete('There was an error with your subscription, please try again or contact support', 'btn btn-danger');
              }
            }
          );
      }
    });

    handler.open({
      name: 'INSTANETWORK INC',
      description: pack + 'Package',
      amount: price,
      image: './assets/img/stripe_logo.jpg',
      currency: 'cad',
      'billing-address': true,
      'panel-label': 'Subscribe'
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

  private cancelSubscription(pack) {
    this.userService.cancelSubscription()
      .subscribe(result => {
          if (result) {
            this.alertUserSubscriptionComplete('The subscription for ' + pack + ' was successfully Cancelled ', 'btn btn-success');
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

  private changeSubscription(pack) {
    this.userService.upgradeSubscription(pack)
      .subscribe(result => {
          if (result) {
            this.alertUserSubscriptionComplete('The subscription was successfully changed to ' + pack + '!', 'btn btn-success');
            this.effectiveDate();
            this.updatebuttons(pack);
          } else {
            this.alertUserSubscriptionComplete('There was an error with changing your subscription, please contact support or try again!', 'btn btn-danger');
          }
        },
        (err) => {
          if(err.status === 402) {
            this.alertUserSubscriptionComplete(err._body, 'btn btn-danger');
          } else {
            this.alertUserSubscriptionComplete('There was an error with changing your subscription, please contact support or try again!', 'btn btn-danger');
          }
        }
      );
  }

  private setBusinessDiscount(value) {
    this.businessPromoApplied = true;
    var discount = Math.floor(this.businessCost - (this.businessCost * value / 100));
    this.businessViewCost = discount;
    this.businessTotalCost = discount * 100;
  }

  private setPremiumDiscount(value) {
    this.premiumPromoApplied = true;
    var discount = Math.floor(this.premiumCost - (this.premiumCost * value / 100));
    this.premiumViewCost = discount;
    this.premiumTotalCost = discount * 100;
  }

  private setPrimaryDiscount(value) {
    this.primaryPromoApplied = true;
    var discount = Math.floor(this.primaryCost - (this.primaryCost * value / 100));
    this.primaryViewCost = discount;
    this.primaryTotalCost = discount * 100;
  }
}
