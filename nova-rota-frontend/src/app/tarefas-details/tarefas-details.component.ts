import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

declare var $: any;
@Component({
  selector: 'app-tarefas-details',
  templateUrl: './tarefas-details.component.html',
  styleUrls: ['./tarefas-details.component.css'],
})
export class TarefasDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private toastr: ToastrService,
    private appComponent: AppComponent
  ) {}
  selected_tarefa = { titulo: '', descricao: '', status_tarefa: '' };
  update_tarefa = { titulo: '', descricao: '', status_tarefa: true };

  selected_id;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id'));
      this.selected_id = id;
      this.loadTarefa(id);
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

  loadTarefa(id: number) {
    this.api.conectar('tarefas/', id).subscribe(
      (data) => {
        this.selected_tarefa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }
  update() {
    this.api.conectar('tarefas/', this.selected_tarefa).subscribe(
      (data) => {
        this.toastr.success('Atualizado com sucesso!');
        this.update_tarefa = data;
        $('.texto-overlay').fadeOut('100');
        $('#over-text').fadeOut('100');
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }
  delete() {
    this.api.apagar('tarefas/', this.selected_id).subscribe(
      (data) => {
        this.toastr.success('Deletado com sucesso!');
        let index: number;

        this.appComponent.tarefas.forEach((e, i) => {
          if (e.id == this.selected_id) index = i;
        });
        this.appComponent.tarefas.splice(index, 1);
        $('.texto-overlay').fadeOut('100');
        $('#over-text').fadeOut('100');
      },
      (error) => {
        this.toastr.error('Esta Tarefa não existe mais!', error.message);
      }
    );
  }
}
