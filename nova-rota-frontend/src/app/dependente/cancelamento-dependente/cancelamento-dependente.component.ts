import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
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

  constructor(private toastrService: ToastrService, private api: ApiService) {
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
        this.toastrService.error('Aconteceu um Erro!', error.message);
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
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  dependenteClicked(e, dependente) {
    e.stopPropagation();
    this.cadastro.id = dependente.id;
    this.cadastro.nome = dependente.nome;
    $('#cancelamentoDependente').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#cancelamentoDependente').fadeOut(250);
  }

  cancelarDependente() {
    this.api.apagar('parentesco/', this.cadastro.id).subscribe(
      (data) => {
        this.toastrService.success('Dependente CANCELADO com sucesso!');
        $('#cancelamentoDependente').fadeOut(250);
        this.getDependentesAtivos();
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  preCancelar(dependente: Dependente) {
    
    let cadastro = new CancelarCadastro;
    cadastro.id = dependente.id;
    cadastro.nome = dependente.nome;
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
    this.api.apagar('parentesco/', dependente.id).subscribe(
      (data) => {
        this.cancelados.cancelados.push(dependente);
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
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
