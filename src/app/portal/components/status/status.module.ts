import { NgModule } from '@angular/core';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatusRoutingModule } from './status-routing.module';

import { StatusComponent } from './status.component';

@NgModule({
  declarations: [
    StatusComponent],
  imports: [
    SharedModule,
    StatusRoutingModule,
    CommonLayoutModule
  ]
})
export class StatusModule { }
