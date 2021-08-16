import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { AnimalListPageRoutingModule } from './animal-list-routing.module';

import { AnimalListPage } from './animal-list.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    AnimalListPageRoutingModule
  ],
  declarations: [AnimalListPage]
})
export class AnimalListPageModule {}
