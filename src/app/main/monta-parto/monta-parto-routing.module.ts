import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MontaPartoPage } from './monta-parto.page';

const routes: Routes = [
  {
    path: '',
    component: MontaPartoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MontaPartoPageRoutingModule {}
