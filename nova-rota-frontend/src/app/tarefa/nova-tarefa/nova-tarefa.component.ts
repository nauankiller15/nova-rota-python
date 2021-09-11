import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
import { AuthService } from '../../account/login/auth.service';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';
import { Tarefa } from '../../home/models';

declare var $: any;

@Component({
  selector: 'nova-tarefa',
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css'],
})
export class NovaTarefaComponent implements OnInit {
  nova_tarefa: Tarefa = new Tarefa;

  constructor(
    private api: ApiService,
    private toastrService: ToastrService,
    private homeComponent: HomeComponent
  ) {}

  ngOnInit(): void {

    // FECHAR NOVA TAREFA
    $('#fechar-bt4').on('click', function () {
      $('#over-tarefa').fadeOut('100');
      $('.nova-tarefa').fadeOut('100');
      $('#tarefas').fadeIn('100');
      $('.box-text').fadeIn('100');
    });
    $('#over-tarefa').on('click', function () {
      $('#over-tarefa').fadeOut('100');
      $('.nova-tarefa').fadeOut('100');
      $('#tarefas').fadeIn('100');
      $('.box-text').fadeIn('100');
    });

    $('.eraseTarefa').click(function () {
      $('#includeTarefa').find('input:text, textarea').val('');
    });
    //
  }
  save() {
    this.api.inserir('tarefas/', this.nova_tarefa).subscribe(
      (data) => {
        this.homeComponent.tarefas.push(data);
        this.toastrService.success('Tarefa criada com sucesso!', data.message);
        $('.nova-tarefa').fadeOut('100');
        $('#over-tarefa').fadeOut('100');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }
}
