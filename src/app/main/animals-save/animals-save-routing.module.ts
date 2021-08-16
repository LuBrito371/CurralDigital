import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalsSavePage } from './animals-save.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalsSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalsSavePageRoutingModule {}
