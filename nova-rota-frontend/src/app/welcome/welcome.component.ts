import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

declare var $: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  // novidades
  novidades = [{ id: '', titulo: '' }];
  selected_novidade = { id: '', titulo: '', descricao: '' };
  p: number = 1;

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  //
  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router
  ) {
    this.getNovidades();
  }

  ngOnInit(): void {
    // CARREGADOR TIMEOUT
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

    this.intervalId = window.setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
      this.count = this.count === 2 ? 5 : 2;
      this.widthHeightSizeInPixels =
        this.widthHeightSizeInPixels === 50 ? 100 : 50;
    }, 5000);
    //---------------

    $('#fechar-novidade').on('click', function () {
      $('.box-novidade').slideUp('100');
      $('#novidadeAberta').fadeOut('100');
    });

    $('#novidadeAberta').on('click', function () {
      $('.box-novidade').slideUp('100');
      $('#novidadeAberta').fadeOut('100');
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getNovidades = () => {
    this.api.getAllNovidades().subscribe(
      (data) => {
        this.novidades = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadNovidade(id: string) {
    this.api.getNovidades(id).subscribe(
      (data) => {
        this.selected_novidade = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  // novidadeClicked = (novidade: { id: string }) => {
  //   console.log(novidade)
  //   $('#novidadeAberta').fadeIn('100');
  //   $('.box-novidade').fadeIn('100');
  //   this.router.navigate(['novidade-details', novidade.id]);
  // };

  novidadeClicked = (novidade: { id: any }) => {
    $('#novidadeAberta').fadeIn('100');
    $('.box-novidade').slideDown('100');
    this.api.getNovidades(novidade.id).subscribe(
      (data) => {
        this.selected_novidade = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };
}
