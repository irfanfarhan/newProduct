import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const commonLayoutComponents = [
  HeaderComponent,
  FooterComponent,
  LandingPageComponent
];
@NgModule({
  declarations: [...commonLayoutComponents],
  imports: [
    SharedModule
  ],
  exports: [...commonLayoutComponents]
})
export class CommonLayoutModule { }
