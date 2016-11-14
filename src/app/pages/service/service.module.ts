import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { HashtagService } from '../../_services/hashtag.service';

import { Service } from './service.component.ts';
import { routing }       from './service.routing.ts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule
  ],
  declarations: [
    Service
  ],
  providers: [
    HashtagService
  ]
})
export default class ServiceModule {}
