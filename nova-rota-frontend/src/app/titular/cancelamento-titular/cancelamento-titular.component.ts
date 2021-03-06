import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
import { ApiService } from '../../api.service';
import { CancelarCadastro, Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-cancelamento-titular',
  templateUrl: './cancelamento-titular.component.html',
  styleUrls: ['./cancelamento-titular.component.css'],
})
export class CancelamentoTitularComponent implements OnInit {
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

  constructor(private toastrService: ToastrService, private api: ApiService) {
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
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  };

  titularClicked(e, titular) {
    e.stopPropagation();
    this.cadastro.id = titular.id;
    this.cadastro.nome = titular.nome;
    $('#cancelamentoTitular').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#cancelamentoTitular').fadeOut(250);
  }

  cancelarTitular() {
    this.api.apagar('titular/', this.cadastro.id).subscribe(
      (data) => {
        this.toastrService.success('`Titular <b>CANCELADO</b> com sucesso!`');

        $('#cancelamentoTitular').fadeOut(250);
        this.getTitulares();
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  PreCancelar(titular: Titular) {
    let cadastro = new CancelarCadastro;
    cadastro.id = titular.id;
    cadastro.nome = titular.nome;
    if (this.preCancelado(cadastro.id) == false) {
      this.cancelamentos.push(cadastro);
      $(`#checkbox${cadastro.id}`).prop( "checked", true );
    } else {
      let novaLista = [];
      this.cancelamentos.forEach(item => {
        if (item.id != cadastro.id) {
          novaLista.push(item);
        }
      });
      this.cancelamentos = novaLista;
      $(`#checkbox${cadastro.id}`).prop( "checked", false );
    }

    if (this.cancelamentos.length > 0) {
      $('#cancelamentoEmLote').fadeIn(250);
    } else {
      $('#cancelamentoEmLote').fadeOut(250);
    }
  }

  desmarcarTodos() {
    this.cancelamentos = [];
    $('#cancelamentoEmLote').fadeOut(250)
  }

  preCancelado(pk: number):boolean {
    let cancelado = false;
    this.cancelamentos.forEach(item => {
      if (item.id == pk) {
        cancelado = true;
      }
    });
    return cancelado
  }

  confirmarCancelamentos() {
    $('#cancelamentoSelecionados').fadeIn(250);
  }

  boxSeleconadosVoltar() {
    $('#cancelamentoSelecionados').fadeOut(250);
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
    $('#cancelamentoSelecionados').fadeOut(250);
    $('#espera').fadeIn(250);
  }

  cancelar(cadastro: CancelarCadastro) {
   
    this.api.apagar('titular/', cadastro.id).subscribe(
      (data) => {
        this.cancelados.cancelados.push(cadastro);
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
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
