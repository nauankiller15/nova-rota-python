import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Dependente, Titular } from '../models';
import { data } from '../../shared/formatar-data';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-consulta-dependente',
  templateUrl: './consulta-dependente.component.html',
  styleUrls: ['./consulta-dependente.component.css'],
})
export class ConsultaDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];

  dependentes: Dependente[] = [];
  dependente: Dependente = new Dependente();
  //
  intervalId: number | null = null;
  //

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  p: number = 1;
  fileToUpload: File = null;
  CPF: string;
  nome_dependente: string;
  nome_benef: string;
  selected_titular: any;

  constructor(
    private toastr: ToastrService, 
    private api: ApiService,
  ) {
    this.getDependentesAtivos();
  }

  ngOnInit(): void {
    // CARREGADOR TIMEOUT
    $(document).ready(() => {
      setTimeout(() => {
        this.contentLoaded = true;
      }, 2500);

      this.intervalId = window.setInterval(() => {
        this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
        this.count = this.count === 2 ? 5 : 2;
        this.widthHeightSizeInPixels =
          this.widthHeightSizeInPixels === 50 ? 100 : 50;
      }, 5000);
    });
    //---------------

    // MÁSCARAS DE INPUT
    $(document).ready(() => {
      $('.date').mask('00/00/0000');
      $('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      $('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 0000-0000');
      $('.phone_us').mask('(000) 000-0000');
      $('.mixed').mask('AAA 000-S0S');
      $('.cpf').mask('000.000.000-00', { reverse: false });
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
      $('.money').mask('000.000.000.000.000,00', { reverse: true });
      $('.money2').mask('#.##0,00', { reverse: true });
      $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
          Z: {
            pattern: /[0-9]/,
            optional: true,
          },
        },
      });
      $('.ip_address').mask('099.099.099.099');
      $('.percent').mask('##0,00%', { reverse: true });
      $('.clear-if-not-match').mask('00/00/0000', { clearIfNotMatch: true });
      $('.placeholder').mask('00/00/0000', {
        translation: {
          placeholder: '__/__/____',
        },
      });
      $('.placeholder2').mask('00/00/0000', {
        placeholder: '__/__/____',
      });
      $('.fallback').mask('00r00r0000', {
        translation: {
          r: {
            pattern: /[\/]/,
            fallback: '/',
          },
          placeholder: '__/__/____',
        },
      });
      $('.selectonfocus').mask('00/00/0000', { selectOnFocus: true });
    });
    //

    // ALTERAR O TITULAR
    $('#alterar-titular-btn').click(function () {
      $('#alterar-titular').fadeIn('200');
    });

    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardadosdepConsulta').click(function () {
      $('#dependentesappearConsulta').fadeOut('200');
      $('#consulta3').slideDown('200');
      $('#postDepConsulta').slideUp(600);
    });

    $('#abrirAnexoConsultaDependente').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoConsultaDependente').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });
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

  searchNomeBenef(nome_dependente: string) {
    if (nome_dependente != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.nome_dependente.match(nome_dependente);
      });
    } else if (nome_dependente == '') {
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

  getDependentes() {
    this.api.listar('parentesco/').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  dependenteClickedConsulta = (dependente: Dependente) => {
    $('#consulta3').slideUp(250);
    $('#dependentesappearConsulta').slideDown(250);
    $('#postDepConsulta').slideDown(600);
    this.dependente = dependente;
  };

  depAtivo() {
    this.getDependentesAtivos();
    $('.menuVigencia').removeClass('canceladoBorder');
    $('.menuItems li').siblings().removeClass('canceladoBtn');
    $('.menuItems li').addClass('active');
    $('.cancelados').removeClass('canceladoBtn');
    $('.cancelados').removeClass('active');
  }
  depCancelado() {
    this.getDependentesInativos();
    $('.menuVigencia').addClass('canceladoBorder');
    $('.cancelados').addClass('canceladoBtn');
    $('.radiusTop').removeClass('active');
    $('.cancelados').removeClass('active');
  }

  data(data:string) {
    const datePipe: DatePipe = new DatePipe('en-US')
    let dataFormatada = datePipe.transform(data, 'dd/MM/YYYY');

    return dataFormatada
  }

  definirPrioridade(data) {
    const hoje = new Date();
    let dataPrioridade = new Date(data);
    dataPrioridade.setMonth(dataPrioridade.getMonth() + 1);
    let prioridade = 'Prioridade';
    if (dataPrioridade < hoje) {
      prioridade = "Sem Prioridade";
    }

    return prioridade
  }
}
