import { NgModule } from '@angular/core';
import { CommonLayoutModule } from 'src/app/common/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    SharedModule,
    RestaurantsRoutingModule,
    CommonLayoutModule
  ]
})
export class RestaurantsModule { }
