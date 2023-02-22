import { NgModule } from '@angular/core';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { StoredCardsComponent } from './stored-cards/stored-cards.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { ThirdPartyComponent } from './third-party/third-party.component';

@NgModule({
  declarations: [
    CustomerComponent,
    ProfileDetailsComponent,
    OrderHistoryComponent,
    StoredCardsComponent,
    CreditCardsComponent,
    ThirdPartyComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    CommonLayoutModule
  ]
})
export class CustomerModule { }
