import { NgModule } from '@angular/core';

import { AnimalsSavePageRoutingModule } from './animals-save-routing.module';

import { AnimalsSavePage } from './animals-save.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
   SharedModule,
    AnimalsSavePageRoutingModule
  ],
  declarations: [AnimalsSavePage]
})
export class AnimalsSavePageModule {}
