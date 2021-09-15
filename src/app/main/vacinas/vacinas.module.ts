import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { VacinasPageRoutingModule } from './vacinas-routing.module';

import { VacinasPage } from './vacinas.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    VacinasPageRoutingModule
  ],
  declarations: [VacinasPage]
})
export class VacinasPageModule {}
