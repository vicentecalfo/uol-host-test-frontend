import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'painel-de-clientes', loadChildren: './clients/panel/panel.module#PanelModule' },
  { path: 'criar-cliente', loadChildren: './clients/edit/edit.module#EditModule' },
  { path: 'editar-cliente/:id', loadChildren: './clients/edit/edit.module#EditModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
