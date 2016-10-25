import {Component, ViewEncapsulation} from '@angular/core';
import { SubscriptionService } from '../../_services/subscription.service';

@Component({
  selector: 'dashboard',
  providers:[SubscriptionService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  result:Object;

  constructor(subscriptionService: SubscriptionService){
    subscriptionService.getEntries().subscribe(res => this.result = res);
    console.log(this.result);
  }
}
