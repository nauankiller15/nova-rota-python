import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { CancelarCadastro, Dependente } from '../models';

declare var $: any;

@Component({
  selector: 'app-cancelamento-dependente',
  templateUrl: './cancelamento-dependente.component.html',
  styleUrls: ['./cancelamento-dependente.component.css'],
})
export class CancelamentoDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];

  dependentes: Dependente[] = [];
  cadastro: CancelarCadastro = new CancelarCadastro;
  cancelamentos: CancelarCadastro[] = [];
  cancelados = { cancelados: [], erros: [] };
  //
  intervalId: number | null = null;
  //

  p: number = 1;

  constructor(private toastr: ToastrService, private api: ApiService) {
    this.getDependentesAtivos();
  }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    $('.eraseCanc').click(function () {
      $('form').each(function () {
        this.reset();
      });
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
    });
    //
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.dependentes;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.dependentes;
    }
  }

  getDependentesAtivos() {
    this.api.listar('parentesco/?ativo=true').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  getDependentesInativos() {
    this.api.listar('parentesco/?ativo=false').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  dependenteClicked(e, dependente) {
    e.stopPropagation();
    this.cadastro.id = dependente.id;
    this.cadastro.nome = dependente.nome;
    this.cadastro.ativo = false;    
    $('#cancelamentoDependente').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#cancelamentoDependente').fadeOut(250);
  }

  cancelarDependente() {
    this.cadastro.ativo = false;
    this.api.atualizarCampo('parentesco/', this.cadastro).subscribe(
      (data) => {
        this.toastr.success('Dependente CANCELADO com sucesso!');
        $('#cancelamentoDependente').fadeOut(250);
        this.getDependentesAtivos();
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  preCancelar(dependente: Dependente) {
    
    let cadastro = new CancelarCadastro;
    cadastro.id = dependente.id;
    cadastro.nome = dependente.nome;
    cadastro.ativo = false;
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
      $('#cancelamentoEmLote').show();
    } else {
      $('#cancelamentoEmLote').hide();
    }
  }

  desmarcarTodos() {
    this.cancelamentos = [];
    $('#cancelamentoEmLote').hide()
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
    this.getDependentesAtivos();
    this.cancelamentos = [];
    $('#espera').fadeOut(250);
  }

  cancelarSelecionados() {
    this.cancelamentos.forEach((dependente) => {
      this.cancelar(dependente);
    });
    $('#cancelamentoSelecionados').fadeOut(250);
    $('#espera').fadeIn(250);
  }

  cancelar(dependente: CancelarCadastro) {
    dependente.ativo = false;
    this.api.atualizarCampo('parentesco/', dependente).subscribe(
      (data) => {
        this.cancelados.cancelados.push(dependente);
      },
      (error) => {
        let mensagens = error.error;
        let erros = [];
        for (let campo in mensagens) {
          erros.push(mensagens[campo]);
        }
        this.cancelados.erros.push({ dependente: dependente, erros: erros });
      }
    );
  }
}
