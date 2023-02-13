import { NgModule } from '@angular/core';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@NgModule({
  declarations: [
    CustomerComponent,
    ProfileDetailsComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    CommonLayoutModule
  ]
})
export class CustomerModule { }
