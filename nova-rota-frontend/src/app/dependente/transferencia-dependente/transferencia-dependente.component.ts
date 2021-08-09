import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Dependente, Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-transferencia-dependente',
  templateUrl: './transferencia-dependente.component.html',
  styleUrls: ['./transferencia-dependente.component.css']
})
export class TransferenciaDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];

  dependentes: Dependente[] = [];
  dependente: Dependente = new Dependente();
  cancelamentos: Dependente[] = [];
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

  dependenteClicked(dependente) {
    this.dependente = dependente;
    $('#cancelamentoDependente').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#cancelamentoDependente').fadeOut(250);
  }

  cancelarDependente() {
    this.dependente.ativo = false;
    this.api.atualizar('parentesco/', this.dependente).subscribe(
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

  preCancelar(adicionar: boolean, dependente: Dependente) {
    if (adicionar == true) {
      this.cancelamentos.push(dependente);
    } else {
      const indice = this.cancelamentos.indexOf(dependente);
      this.cancelamentos.splice(indice, 1);
    }
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

  cancelar(dependente: Dependente) {
    dependente.ativo = false;
    this.api.atualizar('parentesco/', dependente).subscribe(
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
  tipoPrioridade(data) {
    const hoje = new Date();
    let dataPrioridade = new Date(data);
    dataPrioridade.setMonth(dataPrioridade.getMonth() + 1);
    let prioridade = 'Prioridade';
    console.log(dataPrioridade, hoje, dataPrioridade > hoje);
    if (dataPrioridade < hoje) {
      prioridade = "Sem Prioridade";
    }

    return prioridade
  }
}
