import {Component, ViewEncapsulation, Renderer} from '@angular/core';

@Component({
  selector: 'subscription',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./subscription.scss')],
  template: require('./subscription.html')
})
export class Subscription {
  private currentUser: number;
  private globalListener: any;

  constructor(private renderer: Renderer) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private openCheckoutBusiness() {
   this.checkout(1000, 'Business Package');
  }

  private openCheckoutPremium() {
    this.checkout(8000, 'Premium Package');
  }

  private openCheckoutPrimary() {
    this.checkout(6000, 'Primary Package');
  }

  private checkout(price, desc) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_rgv209vKtNJJOruFdt12meDo',
      locale: 'auto',
      token: function (token: any) {
        console.log("hey " + token.id);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'INSTANETWORK INC',
      description: desc,
      amount: price,
      image: './assets/img/stripe_logo.jpg',
      currency: 'cad'
    });

    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }
}
