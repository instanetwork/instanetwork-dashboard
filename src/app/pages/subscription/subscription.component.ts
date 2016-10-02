import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'subscription',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./subscription.scss')],
  template: require('./subscription.html')
})
export class Subscription {

  constructor() {
  }

}
