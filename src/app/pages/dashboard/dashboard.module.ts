import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { HashtagService } from '../../_services/hashtag.service';
import { InstagramAuthenticationService } from '../../_services/instagram.authentication.service';
import { ProfileService } from '../../_services/profile.service';
import { IpService } from '../../_services/ip.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { Dashboard } from './dashboard.component.ts';
import { routing }       from './dashboard.routing.ts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    Dashboard
  ],
  providers: [
    HashtagService,
    InstagramAuthenticationService,
    ProfileService,
    IpService
  ],
  bootstrap: [
    Dashboard
  ]
})
export default class DashboardModule {}
