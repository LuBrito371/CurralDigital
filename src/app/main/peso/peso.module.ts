import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PesoPageRoutingModule } from './peso-routing.module';

import { PesoPage } from './peso.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PesoPageRoutingModule
  ],
  declarations: [PesoPage]
})
export class PesoPageModule {}
