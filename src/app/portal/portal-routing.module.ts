import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { PortalComponent } from './portal.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' },
      {
        path: 'customer',
        loadChildren: () => import('./components/customer/customer.module').then((m) => m.CustomerModule),
        //canActivate: [MsalGuard]
      },
      {
        path: 'transfer',
        loadChildren: () => import('./components/transfer/transfer.module').then((m) => m.TransferModule),
        //canActivate: [MsalGuard]
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./components/restaurants/restaurants.module').then((m) => m.RestaurantsModule),
        //canActivate: [MsalGuard]
      },
      {
        path: 'status',
        loadChildren: () => import('./components/status/status.module').then((m) => m.StatusModule),
        //canActivate: [MsalGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
