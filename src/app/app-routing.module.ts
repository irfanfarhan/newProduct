import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { LandingPageComponent } from './common/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./portal/portal.module').then((m) => m.PortalModule),
   // canActivate: [MsalGuard]
  },
  {
    path: '',
    component: LandingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled', scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }