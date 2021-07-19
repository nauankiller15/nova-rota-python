import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<menu></menu><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //
  dependente: any[];
  titular: any[];

  title = 'nova-rota-frontend';

  selected_titular = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_benef: '',
    data_nascimento: '',
    sexo: '',
    carteirinha: '',
    estado_civil: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: null,
    anexo_doc_casamento: null,
    anexo_doc_empregaticio: null,
    CEP: '',
    celular: '',
    cidade: '',
    estado: '',
    declaracao_saude: '',
    status: '',
    desc_declarao_saude: '',
    observacoes: null,
  };

  selected_dependente = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_dependente: '',
    data_nascimento: '',
    sexo: '',
    carteirinha: '',
    estado_civil: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: null,
    anexo_doc_casamento: null,
    anexo_doc_nascimento: null,
    tipo_parentesco: '',
    CEP: '',
    celular: '',
    cidade: '',
    estado: '',
    declaracao_saude: '',
    status: '',
    desc_declarao_saude: '',
    observacoes: null,
    titular: null,
    nome_benef: null,
  };

  tarefas = [{ id: '', titulo: '' }];
  selected_tarefa = { id: 0, titulo: '', descricao: '', status_tarefa: '' };

  titulo: string;
  p: number = 1;
  selected_id: any;

  ngOnInit() {
    // MENU PRINCIPAL ANIMAÇÕES
    $('[routerLink]').click(function () {
      $('.vertical-nav-menu li a').removeClass('mm-active');
      $(this).find('a').addClass('mm-active');
    });

    // $("#btnEditar").on('click', function() {
    //   $('input[name="edit"]').removeAttr('readonly');
    // });
    // TAREFAS ANIM

    // ABRIR TELA DE TAREFAS
    $('#tarefas-bt').on('click', function () {
      $('#tarefas').fadeIn('100');
      $('.box-text').fadeIn('100');
    });

    $('#fechar-bt').on('click', function () {
      $('#tarefas').fadeOut('100');
      $('.box-text').fadeOut('100');
    });
    //

    //
    $('#tarefas').on('click', function () {
      $('#tarefas').fadeOut('100');
      $('.box-text').fadeOut('100');
    });

    // CONFIG ANIM

    $('#config-bt').on('click', function () {
      $('#config').fadeIn('100');
    });

    $('#fechar-bt2').on('click', function () {
      $('#config').fadeOut('100');
    });
    this.showMessage();

  }

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.getTarefas();

  }
  message = null;
    
  showMessage() {
    this.api.listar('mensagens/').subscribe((message: any) => {
      this.message = message;
      console.log(this.message);
    });
  }


  getTarefas = () => {
    this.api.listar('tarefas/').subscribe(
      (data) => {
        this.tarefas = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  searchTarefa() {
    if (this.titulo != '') {
      this.tarefas = this.tarefas.filter((res) => {
        return res.titulo
          .toLocaleLowerCase()
          .match(this.titulo.toLocaleLowerCase());
      });
    } else if (this.titulo == '') {
      this.getTarefas();
    }
  }


}
