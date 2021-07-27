import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-cancelamento-titular',
  templateUrl: './cancelamento-titular.component.html',
  styleUrls: ['./cancelamento-titular.component.css'],
})
export class CancelamentoTitularComponent implements OnInit {
  titular: Titular = new Titular();

  busca: Titular[] = [];
  titulares: Titular[] = [];

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  p: number = 1;
  //

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.getTitulares();
  }

  ngOnInit(): void {
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

  searchNomeBenef(nome_benef: string) {
    if (nome_benef != '') {
      this.busca = this.titulares.filter((res) => {
        return res.nome_benef.match(nome_benef);
      });
    } else if (nome_benef == '') {
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
    this.titular = titular;
    $('#cancelamentoTitular').fadeIn(250);
  }

  boxCancelarVoltar() {
    $('#cancelamentoTitular').fadeOut(250);
  }

  cancelarTitular() {
    this.titular.ativo = false;
    this.api.atualizar('titular/', this.titular).subscribe(
      (data) => {
        this.toastr.success('`Titular <b>CANCELADO</b> com sucesso!`');
        $('#cancelamentoTitular').fadeOut(250);
        this.getTitulares();
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
