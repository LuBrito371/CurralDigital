import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PartoPageRoutingModule } from './parto-routing.module';

import { PartoPage } from './parto.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PartoPageRoutingModule
  ],
  declarations: [PartoPage]
})
export class PartoPageModule {}
