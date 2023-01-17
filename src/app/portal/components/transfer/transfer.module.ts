import { NgModule } from '@angular/core';
import { TransferComponent } from './transfer.component';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransferRoutingModule } from './transfer-routing.module';

@NgModule({
  declarations: [TransferComponent],
  imports: [
    SharedModule,
    TransferRoutingModule,
    CommonLayoutModule
  ]
})
export class TransferModule { }
