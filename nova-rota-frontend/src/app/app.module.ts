import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TarefasDetailsComponent } from './tarefas-details/tarefas-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlteracaoTitularComponent } from './alteracao-titular/alteracao-titular.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NovoTitularComponent } from './novo-titular/novo-titular.component';
import { AltTitularDetailsComponent } from './alt-titular-details/alt-titular-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NovoDependenteComponent } from './novo-dependente/novo-dependente.component';
import { AlteracaoDependenteComponent } from './alteracao-dependente/alteracao-dependente.component';
import { AltDependenteDetailsComponent } from './alt-dependente-details/alt-dependente-details.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NovaEmpresaComponent } from './nova-empresa/nova-empresa.component';
import { AlteracaoEmpresaComponent } from './alteracao-empresa/alteracao-empresa.component';
import { AltEmpresaDetailsComponent } from './alt-empresa-details/alt-empresa-details.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NovidadesDetailsComponent } from './novidades-details/novidades-details.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
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
    LoginComponent,
    WelcomeComponent,
    NovidadesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    RouterModule.forRoot([
      // titulares
      { path: 'alteracao-titular', component: AlteracaoTitularComponent },
      { path: 'novo-titular', component: NovoTitularComponent },
      // dependente
      { path: 'novo-dependente', component: NovoTitularComponent },
      { path: 'alteracao-dependente', component: AlteracaoDependenteComponent },
      // dashboard
      { path: 'dashboard', component: DashboardComponent },
      //
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ]),
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
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
