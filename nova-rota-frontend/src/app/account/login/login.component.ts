import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Login } from './models';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Login = new Login;
  
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/'])
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
    try{
      const resp = await this.authService.autenticar(this.usuario);
      if (resp === true) {
        this.toastr.success('ok', 'login efetuado')
      }
    } catch (error) {
      this.toastr.error('erro', 'erro ao efetuar login')
    }
  }
}
