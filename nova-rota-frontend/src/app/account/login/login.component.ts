import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    username: '',
    password: ''
  };

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router,) { }

  ngOnInit(): void {

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

  login() {
    console.log(this.usuario);
    this.api.conectar('login/', this.usuario).subscribe(
      (data) => {
        const token = data['token']
        localStorage.setItem('token', token)
        this.router.navigate(['']);
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }
}
