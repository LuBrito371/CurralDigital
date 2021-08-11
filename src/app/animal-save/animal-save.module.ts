import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalSavePageRoutingModule } from './animal-save-routing.module';

import { AnimalSavePage } from './animal-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalSavePageRoutingModule
  ],
  declarations: [AnimalSavePage]
})
export class AnimalSavePageModule {}
