import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/home/home.component';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'novidades-details',
  templateUrl: './novidades-details.component.html',
  styleUrls: ['./novidades-details.component.css']
})

export class NovidadesDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private toastr: ToastrService,
  ) {}

  selected_novidade = { titulo: '', descricao: '' };

  selected_id;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id'));
      this.selected_id = id;
      this.loadNovidade(id);
    });
    $('#fechar-bt3').on('click', function () {
      $('#over-text').fadeOut('100');
      $('.texto-overlay').fadeOut('100');
      $('#tarefas').fadeIn('100');
      $('.box-text').fadeIn('100');
    });
    $('#over-text').on('click', function () {
      $('#over-text').fadeOut('100');
      $('.texto-overlay').fadeOut('100');
      $('#tarefas').fadeIn('100');
      $('.box-text').fadeIn('100');
    });
    $('#config-bt').on('click', function () {
      $('#config').fadeIn('100');
    });
    $('#tarefas').on('click', function () {
      $('.texto-overlay').fadeOut('100');
      $('#over-text').fadeOut('100');
    });
    $('#fechar-bt2').on('click', function () {
      $('#config').fadeOut('100');
    });
  }

  loadNovidade(id: any) {
    this.api.getNovidades(id).subscribe(
      (data) => {
        this.selected_novidade = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }
}
