import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommonLayoutModule } from '../common/common.module';
import { PortalRoutingModule } from './portal-routing.module';

import { PortalComponent } from './portal.component';
import { MessageService } from 'primeng/api';

export const portalComponents = [
  PortalComponent
];

@NgModule({
  declarations: [
    ...portalComponents
  ],
  imports: [
    SharedModule,
    PortalRoutingModule,
    CommonLayoutModule
  ],
  exports: [...portalComponents],
  providers: [MessageService]
})
export class PortalModule { }
