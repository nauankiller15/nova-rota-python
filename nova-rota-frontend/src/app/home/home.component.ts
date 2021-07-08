import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../account/login/models';
import { AuthService } from '../account/login/auth.service';
import { NgIf } from '@angular/common';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  template: '<menu></menu><router-outlet></router-outlet>',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario: User = new User();

  // carregador
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  //

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

  // tarefas
  tarefas = [{ id: '', titulo: '' }];
  selected_tarefa = { id: '', titulo: '', descricao: '', status_tarefa: '' };
  // novidades
  novidades = [{ id: '', titulo: '' }];
  selected_novidade = { id: '', titulo: '', descricao: '' };
  //
  titulo: string;
  p: number = 1;
  selected_id: any;
  update_tarefa: any;

  public loading = false;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getTarefas();
  }

  ngOnInit() {
    this.usuario = this.authService.getUser();

    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

    this.intervalId = window.setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
      this.count = this.count === 2 ? 5 : 2;
      this.widthHeightSizeInPixels =
        this.widthHeightSizeInPixels === 50 ? 100 : 50;
    }, 2000);

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

    // DETAILS TAREFAS
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

  logout() {
    localStorage.removeItem('token');
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

  tarefaClicked = (tarefa: { id: string }) => {
    $('.texto-overlay').fadeIn('200');
    $('#over-text').fadeIn('200');
    this.api.selecionar('tarefas/', tarefa.id).subscribe(
      (data) => {
        this.selected_tarefa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  // tarefaClicked = (tarefa: { id: any }) => {
  //   $('#over-text').fadeIn('100');
  //   $('.texto-overlay').fadeIn('100');
  //   this.router.navigate(['tarefas-detail', tarefa.id]);
  // };

  // ABRIR NOVA TAREFA
  novaTarefa() {
    $('#over-tarefa').fadeIn('100');
    $('.nova-tarefa').fadeIn('100');
    $('#abrirTarefa').fadeIn('100');
  }

  loadTarefa(id: string) {
    this.api.selecionar('tarefas/', id).subscribe(
      (data) => {
        this.selected_tarefa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  loadNovidade(id: string) {
    this.loading = true;
    this.api.selecionar('novidades/', id).subscribe(
      (data) => {
        this.selected_novidade = data;
        this.loading = false;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
        this.loading = false;
      }
    );
  }

  updateTarefa() {
    this.api.atualizar('tarefas/', this.selected_tarefa).subscribe(
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

  deleteTarefa() {
    this.api.apagar('tarefas/', this.selected_id).subscribe(
      (data) => {
        let index: number;
        this.tarefas.forEach((id, i) => {
          if (id == this.selected_id) index = i;
        });
        this.tarefas.splice(index, 1);
        this.toastr.success('Tarefa apagada!');

        $('.texto-overlay').fadeOut('100');
        $('#over-text').fadeOut('100');
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }


}
