import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../account/login/auth.service';
import { ApiService } from '../api.service';
import { Cargo, Usuario } from '../usuario/models';
import { Novidade, Tarefa } from './models';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  template: '<menu></menu><router-outlet></router-outlet>',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userID: number;
  usuario: Usuario = new Usuario;
  cargo: Cargo = new Cargo;

  // carregador
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  //

  //
  title = 'nova-rota-frontend';

  // tarefas
  busca: Tarefa[] = [];
  tarefas: Tarefa[] = [];
  selected_tarefa: Tarefa = new Tarefa;

  // novidades
  novidades: Novidade[] = [];
  selected_novidade: Novidade = new Novidade;
  //
  p: number = 1;

  public loading = false;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.getTarefas();
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.userID = this.authService.getUserId();
    this.loadDadosUsuario(this.userID)

    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

    this.intervalId = window.setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
      this.count = this.count === 2 ? 5 : 2;
      this.widthHeightSizeInPixels =
        this.widthHeightSizeInPixels === 50 ? 100 : 50;
    }, 2000);

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

     // MENU PRINCIPAL ANIMAÇÕES
     $('[routerLink]').click(function () {
      $('.vertical-nav-menu li a').removeClass('mm-active');
      $(this).find('a').addClass('mm-active');
    });
    
  }

  logout() {
    localStorage.removeItem('token');
  }

  getTarefas = () => {
    this.api.listar('tarefas/').subscribe(
      (data) => {
        this.tarefas = data;
        this.busca = data;
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }      }
    );
  };

  searchTarefa(titulo: string) {
    if (titulo != '') {
      this.busca = this.tarefas.filter((res) => {
        return res.titulo
          .toLocaleLowerCase()
          .match(titulo.toLocaleLowerCase());
      });
    } else if (titulo == '') {
      this.busca = this.tarefas
    }
  }

  tarefaClicked = (tarefa: Tarefa) => {
    $('.texto-overlay').fadeIn('200');
    $('#over-text').fadeIn('200');
    
    this.selected_tarefa = tarefa;
  };


  // ABRIR NOVA TAREFA
  novaTarefa() {
    $('#over-tarefa').fadeIn('100');
    $('.nova-tarefa').fadeIn('100');
    $('#abrirTarefa').fadeIn('100');
  }


  loadNovidade(id: string) {
    this.loading = true;
    this.api.selecionar('novidades/', id).subscribe(
      (data) => {
        this.selected_novidade = data;
        this.loading = false;
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
        this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
        this.loading = false;
      }
    );
  }

  loadDadosUsuario(id: number) {
    this.api.listar('dados-usuario/').subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  updateTarefa() {
    this.api.atualizar('tarefas/', this.selected_tarefa).subscribe(
      (data) => {
        this.toastr.success('Atualizado com sucesso!');
        $('.texto-overlay').fadeOut('100');
        $('#over-text').fadeOut('100');
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  deleteTarefa() {
    this.api.apagar('tarefas/', this.selected_tarefa.id).subscribe(
      (data) => {
        this.getTarefas();
        this.toastr.success('Tarefa apagada!');
        $('.texto-overlay').fadeOut('100');
        $('#over-text').fadeOut('100');
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
