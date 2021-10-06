import { NgModule } from '@angular/core';
import { VacinasFemeaPage } from './vacinas-femea.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { VacinasFemeaPageRoutingModule } from './vacinas-femea-routing.module';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    VacinasFemeaPageRoutingModule
  ],
  declarations: [VacinasFemeaPage]
})
export class VacinasFemeaPageModule {}
