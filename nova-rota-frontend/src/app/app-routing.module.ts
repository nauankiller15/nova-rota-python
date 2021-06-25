import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// titulares
import { AltTitularDetailsComponent } from './alt-titular-details/alt-titular-details.component';
import { AlteracaoTitularComponent } from './alteracao-titular/alteracao-titular.component';
import { NovoTitularComponent } from './novo-titular/novo-titular.component';
//
// dependentes
import { AltDependenteDetailsComponent } from './alt-dependente-details/alt-dependente-details.component';
import { AlteracaoDependenteComponent } from './alteracao-dependente/alteracao-dependente.component';
import { NovoDependenteComponent } from './novo-dependente/novo-dependente.component';
//
// tarefas
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { TarefasDetailsComponent } from './tarefas-details/tarefas-details.component';
//
// empresa principal
import { NovaEmpresaComponent } from './nova-empresa/nova-empresa.component';
import { AlteracaoEmpresaComponent } from './alteracao-empresa/alteracao-empresa.component';
import { AltEmpresaDetailsComponent } from './alt-empresa-details/alt-empresa-details.component';
//
//outros
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NovidadesDetailsComponent } from './novidades-details/novidades-details.component';
//

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: WelcomeComponent },
      // ==== TELA DE BEM VINDO ====
      { path: 'bem-vindo', component: WelcomeComponent },
      { path: 'novidade-details', component: NovidadesDetailsComponent },
      // ==== TELA DE PEFIL ====
      { path: 'profile', component: ProfileComponent },
      //]
      // ==== TELA DE DASHBOARD ====
      { path: 'dashboard', component: DashboardComponent },
      //]
      // ==== TELA DE TAREFAS ====
      { path: 'tarefas-detail/:id', component: TarefasDetailsComponent },
      { path: 'nova-tarefa', component: NovaTarefaComponent },
      //]
      // === CADASTRO DE TITULAR ====
      { path: 'novo-titular', component: NovoTitularComponent },
      // ==== ALTERACAO TITULAR ====
      { path: 'alteracao-titular', component: AlteracaoTitularComponent },
      {
        path: 'alt-titular-details/:id',
        component: AltTitularDetailsComponent,
      },
      //]
      // === CADASTRO DE DEPENDENTE ====
      { path: 'novo-dependente', component: NovoDependenteComponent },
      // ==== ALTERACAO TITULAR ====
      { path: 'alteracao-dependente', component: AlteracaoDependenteComponent },
      {
        path: 'alt-dependente-details/:id',
        component: AltDependenteDetailsComponent,
      },
      // === CADASTRO DE EMPRESAS (PRINCIPAL) ====
      { path: 'nova-empresa', component: NovaEmpresaComponent },
      // ==== ALTERACAO EMPRESAS ====
      { path: 'alteracao-empresa', component: AlteracaoEmpresaComponent },
      {
        path: 'alt-empresa-details/:id',
        component: AltEmpresaDetailsComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: CreateAccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  AltTitularDetailsComponent: any;
  NovoTitularComponent: any;
  // -----------------------
  AltDependenteDetailsComponent: any;
  NovoDependenteComponent: any;
}

export const routingComponentes = [
  TarefasDetailsComponent,
  // --------------------
  AlteracaoTitularComponent,
  AltTitularDetailsComponent,
  NovoTitularComponent,
  // --------------------
  AltDependenteDetailsComponent,
  AlteracaoDependenteComponent,
  NovoDependenteComponent,
  // --------------------
  // xxxxxxxxxxxxxxxxxxxx
  AlteracaoEmpresaComponent,
  NovaEmpresaComponent,
];
