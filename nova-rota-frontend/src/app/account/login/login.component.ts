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
      $('.box-tela-privacidade').fadeIn('100');
      $('#politica').fadeIn('100');

    });

    $('#politica').on('click', function () {
      $('#politica').fadeOut('100');
      $('.box-tela-privacidade').fadeOut('100');
    });

  }

}
