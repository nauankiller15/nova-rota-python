import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProfileComponent } from './usuario/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RodapeComponent } from './base/rodape/rodape.component';
import { NgxLoadingModule } from 'ngx-loading';

import { AuthInterceptor } from './http-interceptors/auth-interceptor';

import { SidebarComponent } from './base/sidebar/sidebar.component';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';

import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AlterarUsuarioComponent } from './usuario/alterar-usuario/alterar-usuario.component';
import { NovoUsuarioComponent } from './usuario/novo-usuario/novo-usuario.component';

import { NovoTitularComponent } from './titular/novo-titular/novo-titular.component';
import { AlteracaoTitularComponent } from './titular/alteracao-titular/alteracao-titular.component';
import { AltTitularDetailsComponent } from './titular/alt-titular-details/alt-titular-details.component';
import { ConsultaTitularComponent } from './titular/consulta-titular/consulta-titular.component';
import { CancelamentoTitularComponent } from './titular/cancelamento-titular/cancelamento-titular.component';

import { NovoDependenteComponent } from './dependente/novo-dependente/novo-dependente.component';
import { ConsultaDependenteComponent } from './dependente/consulta-dependente/consulta-dependente.component';
import { AlteracaoDependenteComponent } from './dependente/alteracao-dependente/alteracao-dependente.component';
import { AltDependenteDetailsComponent } from './dependente/alt-dependente-details/alt-dependente-details.component';
import { CancelamentoDependenteComponent } from './dependente/cancelamento-dependente/cancelamento-dependente.component';

import { NovaEmpresaComponent } from './empresa/nova-empresa/nova-empresa.component';
import { AlteracaoEmpresaComponent } from './empresa/alteracao-empresa/alteracao-empresa.component';
import { AltEmpresaDetailsComponent } from './empresa/alt-empresa-details/alt-empresa-details.component';

import { NovaTarefaComponent } from './tarefa/nova-tarefa/nova-tarefa.component';
import { TarefasDetailsComponent } from './tarefa/tarefas-details/tarefas-details.component';

import { NovidadesDetailsComponent } from './novidades-details/novidades-details.component';
import { ReativarCadastroComponent } from './reativar-cadastro/reativar-cadastro.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarefasDetailsComponent,
    NovaTarefaComponent,
    NovoTitularComponent,
    NovoDependenteComponent,
    AlteracaoTitularComponent,
    AltTitularDetailsComponent,
    DashboardComponent,
    NovoDependenteComponent,
    AlteracaoDependenteComponent,
    AltDependenteDetailsComponent,
    NovaEmpresaComponent,
    AlteracaoEmpresaComponent,
    AltEmpresaDetailsComponent,
    HomeComponent,
    AuthenticationComponent,
    ProfileComponent,
    CreateAccountComponent,
    WelcomeComponent,
    NovidadesDetailsComponent,
    RodapeComponent,
    SidebarComponent,
    ConsultaTitularComponent,
    ConsultaDependenteComponent,
    CancelamentoTitularComponent,
    CancelamentoDependenteComponent,
    NovoUsuarioComponent,
    AlterarUsuarioComponent,
    ReativarCadastroComponent,
  ],
  imports: [
    NgxSkeletonLoaderModule.forRoot(),
    BrowserModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    NgxLoadingModule.forRoot({}),
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
