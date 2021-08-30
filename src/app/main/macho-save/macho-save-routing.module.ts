import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachoSavePage } from './macho-save.page';

const routes: Routes = [
  {
    path: '',
    component: MachoSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachoSavePageRoutingModule {}
