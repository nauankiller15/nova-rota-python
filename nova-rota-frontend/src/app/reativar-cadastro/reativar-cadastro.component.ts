import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Dependente } from '../dependente/models';
import { Titular } from '../titular/models';

declare var $: any;

@Component({
  selector: 'app-reativar-cadastro',
  templateUrl: './reativar-cadastro.component.html',
  styleUrls: ['./reativar-cadastro.component.css'],
})
export class ReativarCadastroComponent implements OnInit {
  busca: Array<Titular | Dependente> = [];
  cadastros: Array<Titular | Dependente> = [];
  tipoPesquisa = 'titular';
  cadastro = new Titular();

  contentLoaded = false;
  p = 1;

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    this.loadTitularesCancelados();
  }

  ngOnInit(): void {
    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
  }

  titulares() {
    this.tipoPesquisa = 'titular';
    this.contentLoaded = false;
    this.loadTitularesCancelados();
  }

  dependentes() {
    this.tipoPesquisa = 'dependente';
    this.contentLoaded = false;
    this.loadDependentesCancelados();
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.cadastros.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.cadastros;
    }
  }

  searchNome(nome: string) {
    if (nome != '') {
      this.busca = this.cadastros.filter((res) => {
        return res.nome_benef.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.cadastros;
    }
  }

  loadTitularesCancelados() {
    this.apiService.listar('titular/?ativo=false').subscribe(
      (data) => {
        this.cadastros = data;
        this.busca = data;
        this.contentLoaded = true;
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  }

  loadDependentesCancelados() {
    this.apiService.listar('parentesco/?ativo=false').subscribe(
      (data) => {
        console.log(data);
        this.cadastros = data;
        this.busca = data;
        this.contentLoaded = true;
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  }

  confirmarReativacao(cadastro) {
    this.cadastro = cadastro;
    $('#reativar').fadeIn(250);
  }

  reativarVoltar() {
    $('#reativar').fadeOut(250);
  }

  reativarUsuario() {
    $('#reativar').hide();
    let url = 'titular/';
    if (this.tipoPesquisa == 'dependente') {
      url = 'parentesco/';
    }

    this.cadastro.ativo = true;
    this.apiService.atualizar(url, this.cadastro).subscribe(
      (data) => {
        this.contentLoaded = false;
        if (this.tipoPesquisa == 'titular') {
          this.loadTitularesCancelados();
        } else {
          this.loadDependentesCancelados();
        }
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  }
}
