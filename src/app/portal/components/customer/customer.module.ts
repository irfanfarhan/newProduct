import { NgModule } from '@angular/core';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    CommonLayoutModule
  ]
})
export class CustomerModule { }
