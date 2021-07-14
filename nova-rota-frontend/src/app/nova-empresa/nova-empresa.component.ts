import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import {
  ContratoOperadora,
  ContratoSeguradora,
  Empresa,
  Reajuste,
  Sinistralidade,
} from './models';

declare var $: any;

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
})
export class NovaEmpresaComponent implements OnInit {
  empresa: Empresa = new Empresa();
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora();
  contratoOperadora: ContratoOperadora = new ContratoOperadora();
  sinistralidade: Sinistralidade = new Sinistralidade();
  enviarSinistralidade = false;
  reajuste: Reajuste = new Reajuste();
  enviarReajuste = false;

  constructor(private toastr: ToastrService, private api: ApiService) {}

  ngOnInit(): void {
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
      $('.percent').mask('##0,00%', { reverse: false });
    });

    // TELA DE ANEXO DO DOCUMENTO DA EMPRESA
    $('#dataRecebimento').on('blur', function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#dataRecebimento').on('focus', function () {
      $(this).siblings('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#vinc-anexo-empresa').slideUp();
    //
    $('#fecharAnexo5').click(function () {
      $('#vinc-anexo-empresa').fadeOut('100');
      $('#reanexar5').fadeIn('100');
    });

    $('#abrirAnexo5').click(function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });

    // TELA DE VIGÊNCIA
    $('#dataVigencia').on('blur', function () {
      $('#vinc-vigencia').fadeIn('100');
    });
    $('#dataVigencia').on('focus', function () {
      $(this).siblings('#vinc-vigencia').fadeIn('100');
    });
    $('#vinc-vigencia').slideUp();
    //
    $('#fecharVigencia').click(function () {
      $('#vinc-vigencia').fadeOut('100');
      $('#vigenciaTela').fadeIn('100');
    });

    $('#abrirVigencia').click(function () {
      $('#vinc-vigencia').fadeIn('100');
    });

    // SLIDE LEFT AND RIGHT AJUSTES
    $('#sinistralidadeBtn').click(function () {
      $('#sinisTab').slideDown('100');
      $('#reajusTab').slideUp('100');
    });
    $('#reajusteBtn').click(function () {
      $('#reajusTab').slideDown('100');
      $('#sinisTab').slideUp('100');
    });

    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });

    // $('#filial').trigger('click');
    //

    // OPÇÕES

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

    $('#tipo_contrato').on('change', function () {
      $('.filialSelect').addClass('htSlct');
      if ('Operadora' === $(this).val()) {
        $('#operadora').slideDown('100');
        $('#seguradora').slideUp();
        $('#formularioSeguradora').each(function () {
          this.reset();
        });
      } else if ('Seguradora' === $(this).val()) {
      $('.filialSelect').addClass('htSlct');
        $('#seguradora').slideDown('100');
        $('#operadora').slideUp();
        $('#formularioOperadora').each(function () {
          this.reset();
        });
      } else {
      $('.filialSelect').removeClass('htSlct');
        $('#operadora').slideUp();
        $('#seguradora').slideUp();
      }
    });
  }

  // CADASTRO DE EMPRESAS
  empresaPrincipal() {
    this.empresa.is_filial = false;
    $('#changeEmpFilial').slideUp('100');
    $('#changeEmpPrincipal').slideDown('100');
    // ANIMAÇÃO SELEÇÃO DOS DADOS FILIAIS
    $('.filialSelect').slideUp('100');
    $('.inserirFilial').slideUp('100');
  }
  
  empresaFilial() {
    this.empresa.is_filial = true;
    $('#changeEmpPrincipal').slideUp('100');
    $('#changeEmpFilial').slideDown('100');
    // ANIMAÇÃO SELEÇÃO DOS DADOS FILIAIS
    $('.filialSelect').slideDown('100');
    $('.inserirFilial').slideDown('100');
  }

  newEmpresa() {
    let urlEmpresa = 'empresa/';
    if (this.empresa.is_filial == true) {
      urlEmpresa = 'filial/';
    }

    this.api.inserir(urlEmpresa, this.empresa).subscribe(
      (data) => {
        this.empresa.id = data.id;
        this.newContrato();
        this.newReajuste();
        this.newSinistralidade();
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  newContrato() {
    let urlTipo: string;
    let dados: any;
    if (this.empresa.tipo_contrato == 'Operadora') {
      urlTipo = 'contrato-operadora/';
      dados = this.contratoOperadora;
    } else {
      urlTipo = 'contrato-seguradora/';
      dados = this.contratoSeguradora;
    }

    dados.empresa = this.empresa.id;
    this.api.inserir(urlTipo, dados).subscribe(
      (data) => {
        this.toastr.success('Empresa incluída com sucesso!');
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  newSinistralidade() {
    if (this.enviarSinistralidade == true) {
      this.sinistralidade.empresa = this.empresa.id;
      this.api.inserir('sinistralidade/', this.sinistralidade).subscribe(
        (data) => {
          this.toastr.success('Sinistralidade incluída com sucesso!');
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

  newReajuste() {
    if (this.enviarReajuste == true) {
      this.reajuste.empresa = this.empresa.id;
      this.api.inserir('reajuste/', this.reajuste).subscribe(
        (data) => {
          this.toastr.success('Reajuste incluído com sucesso!');
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
}
