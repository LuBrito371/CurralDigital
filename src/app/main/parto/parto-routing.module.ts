import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartoPage } from './parto.page';

const routes: Routes = [
  {
    path: '',
    component: PartoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartoPageRoutingModule {}
