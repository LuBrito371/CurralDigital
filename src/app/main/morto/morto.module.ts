import { NgModule } from '@angular/core';

import { MortoPageRoutingModule } from './morto-routing.module';

import { MortoPage } from './morto.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    MortoPageRoutingModule
  ],
  declarations: [MortoPage]
})
export class MortoPageModule {}
