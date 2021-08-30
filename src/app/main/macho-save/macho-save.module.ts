import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { MachoSavePageRoutingModule } from './macho-save-routing.module';

import { MachoSavePage } from './macho-save.page';

@NgModule({
  imports: [
    SharedModule,
    MachoSavePageRoutingModule
  ],
  declarations: [MachoSavePage]
})
export class MachoSavePageModule {}
