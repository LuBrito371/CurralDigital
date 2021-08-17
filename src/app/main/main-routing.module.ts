import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: () => import('./animals-save/animals-save.module').then( m => m.AnimalsSavePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./animals-save/animals-save.module').then( m => m.AnimalsSavePageModule)
      },
      {
        path: 'animal-list',
        loadChildren: () => import('./animal-list/animal-list.module').then( m => m.AnimalListPageModule)
      },
      {
        path: 'femea',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/main/page/main.module').then((m) => m.MainPageModule)
          }
        ]
      },
      {
        path: '',
        loadChildren: () => import('src/app/main/page/main.module').then((m) => m.MainPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
