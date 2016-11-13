import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'subscription',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./subscription.scss')],
  template: require('./subscription.html')
})
export class Subscription {
  private currentUser: number;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
