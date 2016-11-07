import {Component, ViewEncapsulation} from '@angular/core';
import {SubscriptionService} from '../../_services/subscription.service';
import 'rxjs/Rx';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html'),
})
export class Dashboard {
  getData: string;

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    console.log("test!!");
    this.subscriptionService.getEntries()
      .subscribe(data => this.getData = JSON.stringify(data),
        error => console.log("Error!"),
        () => console.log("finished!")
      );
    console.log(this.getData);
    console.log("whoa");
  }
}
