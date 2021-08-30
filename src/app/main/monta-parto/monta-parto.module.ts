import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MontaPartoPageRoutingModule } from './monta-parto-routing.module';

import { MontaPartoPage } from './monta-parto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MontaPartoPageRoutingModule
  ],
  declarations: [MontaPartoPage]
})
export class MontaPartoPageModule {}
