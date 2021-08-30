import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { MachoListPageRoutingModule } from './macho-list-routing.module';

import { MachoListPage } from './macho-list.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    MachoListPageRoutingModule
  ],
  declarations: [MachoListPage]
})
export class MachoListPageModule {}
