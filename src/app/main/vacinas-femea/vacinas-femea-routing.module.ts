import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinasFemeaPage } from './vacinas-femea.page';

const routes: Routes = [
  {
    path: '',
    component: VacinasFemeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinasFemeaPageRoutingModule {}
