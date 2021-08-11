import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

import { AnimalListPageRoutingModule } from './animal-list-routing.module';
import { AnimalListPage } from './animal-list.page';
import { ComponentsModule } from './components/components.module';


@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    AnimalListPageRoutingModule
  ],
  declarations: [AnimalListPage]
})
export class AnimalListPageModule {}
