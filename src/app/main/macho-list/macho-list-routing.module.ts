import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachoListPage } from './macho-list.page';

const routes: Routes = [
  {
    path: '',
    component: MachoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachoListPageRoutingModule {}
