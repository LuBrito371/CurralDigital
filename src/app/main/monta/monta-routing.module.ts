import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MontaPage } from './monta.page';

const routes: Routes = [
  {
    path: '',
    component: MontaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MontaPageRoutingModule {}
