import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    SharedModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
