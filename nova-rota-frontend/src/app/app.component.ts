import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $('[data-load-page]').unbind('click');
    $('[data-load-page]').click(function () {
      var page = $(this).attr('data-load-page');
      if (!$(this).find('a').hasClass('mm-active')) {
        $('#conteudo').load(page);
      }

      $('.vertical-nav-menu li a').removeClass('mm-active');
      $(this).find('a').addClass('mm-active');
    });

    // TAREFAS ANIM

    $('#tarefas-bt').on('click', function () {
      $('#tarefas').fadeIn('500');
    });

    $('#fechar-bt').on('click', function () {
      $('#tarefas').fadeOut('500');
    });

    // CONFIG ANIM

    $('#config-bt').on('click', function () {
      $('#config').fadeIn('500');
    });

    $('#fechar-bt2').on('click', function () {
      $('#config').fadeOut('500');
    });
  }
  title = 'nova-rota-frontend';

  selected_tarefa = { id: 0, titulo: '', descricao: '', feito: ''};

  tarefas = [
    { id: 1, titulo: 'Exemplo de Frase 1' },
    { id: 2, titulo: 'Exemplo de Titulo 2' },
    { id: 3, titulo: 'Exemplo de Texto 3' },
  ];

  constructor(private api: ApiService) {
    this.getTarefas();
  }

  getTarefas = () => {
    this.api.getAlltarefas().subscribe(
      (data) => {
        this.tarefas = data;
      },
      (error) => {
        console.log('Aconteceu um Erro!', error.message);
      }
    );
  };
  tarefaClicked = (tarefa) => {
    this.api.getTarefa(tarefa.id).subscribe(
      (data) => {
        console.log(data);
        this.selected_tarefa = data;
      },
      (error) => {
        console.log('Aconteceu um Erro!', error.message);
      }
    );
  };
}
