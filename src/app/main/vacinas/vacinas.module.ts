import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { VacinasPageRoutingModule } from './vacinas-routing.module';

import { VacinasPage } from './vacinas.page';

@NgModule({
  imports: [
    SharedModule,
    VacinasPageRoutingModule
  ],
  declarations: [VacinasPage]
})
export class VacinasPageModule {}
