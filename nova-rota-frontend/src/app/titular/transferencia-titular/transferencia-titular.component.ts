import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { CancelarCadastro, Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-transferencia-titular',
  templateUrl: './transferencia-titular.component.html',
  styleUrls: ['./transferencia-titular.component.css']
})

export class TransferenciaTitularComponent implements OnInit {
  cadastro: CancelarCadastro = new CancelarCadastro;

  busca: Titular[] = [];
  titulares: Titular[] = [];
  cancelamentos: CancelarCadastro[] = [];
  cancelados = { cancelados: [], erros: [] };

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  p: number = 1;
  //

  constructor(private toastr: ToastrService, private api: ApiService) {
    this.getTitulares();
  }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    // CARREGADOR TIMEOUT
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2500);

    this.intervalId = window.setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
      this.count = this.count === 2 ? 5 : 2;
      this.widthHeightSizeInPixels =
        this.widthHeightSizeInPixels === 50 ? 100 : 50;
    }, 5000);
    //---------------
    // MÁSCARAS DE INPUT
    $(document).ready(() => {
      $('.cpf').mask('000.000.000-00', { reverse: false });
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
    });
    //
    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardadosTitConsulta').click(function () {
      $('#titularesappearConsulta').fadeOut('200');
      $('#consulta4').slideDown('200');
      $('#postTitConsulta').slideUp(600);
    });

    $('#abrirAnexoConsulta2').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoConsulta2').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.titulares.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.titulares;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.titulares.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.titulares;
    }
  }

  getTitulares = () => {
    this.api.listar('titular/?ativo=true').subscribe(
      (data) => {
        this.titulares = data;
        this.busca = data;
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  };

  titularClicked(titular) {
    this.cadastro.id = titular.id;
    this.cadastro.nome = titular.nome;
    this.cadastro.ativo = false;
    $('#digitarCodigo').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#digitarCodigo').fadeOut(250);
  }

  confirmaCodigo() {
    $('#digitarCodigo').fadeOut(250);
    $('#digitarCarteirinha').fadeIn(250);
  }

  
  preCancelar(adicionar: boolean, titular: Titular) {
    let cadastro = new CancelarCadastro;
    cadastro.id = titular.id;
    cadastro.nome = titular.nome;
    cadastro.ativo = false;
    if (adicionar == true) {
      this.cancelamentos.push(cadastro);
    } else {
      const indice = this.cancelamentos.indexOf(cadastro);
      this.cancelamentos.splice(indice, 1);
      console.log(this.cancelamentos);
    }
  }

  confirmarCancelamentos() {
    $('#digitarCarteirinha').fadeIn(250);
  }

  voltarCarteirinha() {
    $('#digitarCarteirinha').fadeOut(250);
  }

  boxEsperaVoltar() {
    this.getTitulares();
    this.cancelamentos = [];
    $('#espera').fadeOut(250);
  }

  cancelarSelecionados() {
    this.cancelamentos.forEach((titular) => {
      this.cancelar(titular);
    });
    $('#digitarCarteirinha').fadeOut(250);
    $('#espera').fadeIn(250);
  }

  cancelar(cadastro: CancelarCadastro) {
   
    this.api.atualizarCampo('titular/', cadastro).subscribe(
      (data) => {
        this.cancelados.cancelados.push(cadastro);
      },
      (error) => {
        let mensagens = error.error;
        let erros = [];
        for (let campo in mensagens) {
          erros.push(mensagens[campo]);
        }
        this.cancelados.erros.push({ titular: cadastro, erros: erros });
      }
    );
  }
}
