import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
import { AuthService } from './auth.service';
import { Login } from './models';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario: Login = new Login();
  public loading = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }

    $('#politica-abrir').on('click', function () {
      $('#politica').fadeIn('100');
      $('.box-tela-privacidade').slideDown('500');
    });

    $('#politica').on('click', function () {
      $('#politica').fadeOut('100');
      $('.box-tela-privacidade').fadeOut('100');
    });

    $('#register').on('click', function () {
      $('#criar-conta').fadeIn('100');
      $('.box-criar-conta').slideDown('100');
    });
  }

  async login() {
    this.loading = true;
    try {
      const resp = await this.authService.autenticar(this.usuario);
      if (resp === true) {
        window.location.href = '/'
        this.toastrService.success('Sucesso', 'Login efetuado');
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      const erro = new Erro(this.toastrService, error);
      erro.exibir();     
    }
  }
}
