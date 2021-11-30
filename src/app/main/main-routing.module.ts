import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-female',
        loadChildren: () =>
          import('./animals-save/animals-save.module').then(
            (m) => m.AnimalsSavePageModule
          ),
      },
      {
        path: 'edit-female/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./animals-save/animals-save.module').then(
                (m) => m.AnimalsSavePageModule
              ),
          },
          {
            path: 'vacinas-femea',
            loadChildren: () =>
              import('./vacinas-femea/vacinas-femea.module').then(
                (m) => m.VacinasFemeaPageModule
              ),
          },
          {
            path: 'montas',
            loadChildren: () =>
              import('./morto/morto.module').then((m) => m.MortoPageModule),
          },
          {
            path: 'pesagens',
            loadChildren: () =>
              import('./peso/peso.module').then((m) => m.PesoPageModule),
          },
        ],
      },
      {
        path: 'female-list',
        loadChildren: () =>
          import('./animal-list/animal-list.module').then(
            (m) => m.AnimalListPageModule
          ),
      },
      {
        path: 'male-list',
        loadChildren: () =>
          import('./macho-list/macho-list.module').then(
            (m) => m.MachoListPageModule
          ),
      },
      {
        path: 'create-male',
        loadChildren: () =>
          import('./macho-save/macho-save.module').then(
            (m) => m.MachoSavePageModule
          ),
      },
      {
        path: 'edit-male/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./macho-save/macho-save.module').then(
                (m) => m.MachoSavePageModule
              ),
          },
          {
            path: 'vacinas',
            loadChildren: () =>
              import('./vacinas/vacinas.module').then(
                (m) => m.VacinasPageModule
              ),
          },
          {
            path: 'pesagens',
            loadChildren: () =>
              import('./peso/peso.module').then((m) => m.PesoPageModule),
          },
        ],
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./info/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('src/app/main/page/main.module').then((m) => m.MainPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
