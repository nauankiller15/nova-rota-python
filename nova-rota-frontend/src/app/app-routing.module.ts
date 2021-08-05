import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// titulares
import { AlteracaoTitularComponent } from './titular/alteracao-titular/alteracao-titular.component';
import { NovoTitularComponent } from './titular/novo-titular/novo-titular.component';
import { ConsultaTitularComponent } from './titular/consulta-titular/consulta-titular.component';
import { CancelamentoTitularComponent } from './titular/cancelamento-titular/cancelamento-titular.component';
//
// dependentes
import { AlteracaoDependenteComponent } from './dependente/alteracao-dependente/alteracao-dependente.component';
import { NovoDependenteComponent } from './dependente/novo-dependente/novo-dependente.component';
import { CancelamentoDependenteComponent } from './dependente/cancelamento-dependente/cancelamento-dependente.component';
import { ConsultaDependenteComponent } from './dependente/consulta-dependente/consulta-dependente.component';
//
// tarefas
import { NovaTarefaComponent } from './tarefa/nova-tarefa/nova-tarefa.component';
import { TarefasDetailsComponent } from './tarefa/tarefas-details/tarefas-details.component';
//
// empresa principal e filial
import { NovaEmpresaComponent } from './empresa/nova-empresa/nova-empresa.component';
import { AlteracaoEmpresaComponent } from './empresa/alteracao-empresa/alteracao-empresa.component';
import { AltEmpresaDetailsComponent } from './empresa/alt-empresa-details/alt-empresa-details.component';
//
// Usuario
import { NovoUsuarioComponent } from './usuario/novo-usuario/novo-usuario.component';
import { AlterarUsuarioComponent } from './usuario/alterar-usuario/alterar-usuario.component';
// 
//outros
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './usuario/profile/profile.component';
import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NovidadesDetailsComponent } from './novidades-details/novidades-details.component';
import { ReativarCadastroComponent } from './reativar-cadastro/reativar-cadastro.component';
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

      // ==== TELA DE USUÁRIO ====
      { path: 'novo-usuario', component: NovoUsuarioComponent },
      { path: 'alterar-usuario', component: AlterarUsuarioComponent },
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
      //]
      // === CADASTRO DE DEPENDENTE ====
      { path: 'novo-dependente', component: NovoDependenteComponent },
      // ==== ALTERACAO TITULAR ====
      { path: 'alteracao-dependente', component: AlteracaoDependenteComponent },
      //
      //
      // === CADASTRO DE EMPRESAS ====
      { path: 'nova-empresa', component: NovaEmpresaComponent },
      //
      // ==== ALTERACAO EMPRESAS ====
      { path: 'alteracao-empresa', component: AlteracaoEmpresaComponent },
      {
        path: 'alt-empresa-details/:id',
        component: AltEmpresaDetailsComponent,
      },
      //
      //
      // === CONSULTA DE TITULARES ====
      { path: 'consulta-titular', component: ConsultaTitularComponent },
      //
      //
      // === CANCELAMENTO DE TITULARES ====
      { path: 'cancelamento-titular', component: CancelamentoTitularComponent },
      //
      //
      // === CONSULTA DE DEPENDENTES ====
      { path: 'consulta-dependente', component: ConsultaDependenteComponent },
      //
      //
      // === CANCELAMENTO DE DEPENDENTES ====
      { path: 'cancelamento-dependente', component: CancelamentoDependenteComponent },
      //
      //
      // === REATIVAÇÃO DE CADASTRO ====
      { path: 'reativar-cadastro', component: ReativarCadastroComponent },
      //
      //
    ],
    canActivate: [AuthGuard],
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
  NovoTitularComponent,
  // --------------------
  AlteracaoDependenteComponent,
  NovoDependenteComponent,
  // --------------------
  // xxxxxxxxxxxxxxxxxxxx
  AlteracaoEmpresaComponent,
  NovaEmpresaComponent,
];
