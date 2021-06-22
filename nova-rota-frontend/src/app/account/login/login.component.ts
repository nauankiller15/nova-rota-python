import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,) { }

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

}
