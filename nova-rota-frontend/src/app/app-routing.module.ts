import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarefasDetailsComponent } from './tarefas-details/tarefas-details.component';

const routes: Routes = [
  { path: 'tarefas-detail/:id', component: TarefasDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponentes = [TarefasDetailsComponent, ]