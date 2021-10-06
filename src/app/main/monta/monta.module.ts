import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { MontaPageRoutingModule } from './monta-routing.module';

import { MontaPage } from './monta.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    MontaPageRoutingModule
  ],
  declarations: [MontaPage]
})
export class MontaPageModule {}
