import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { ContratoOperadora, ContratoSeguradora, Empresa, Reajuste, Sinistralidade } from './models';

declare var $: any;

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
})
export class NovaEmpresaComponent implements OnInit {
  empresa: Empresa = new Empresa;
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora;
  contratoOperadora: ContratoOperadora = new ContratoOperadora;
  sinistralidade: Sinistralidade = new Sinistralidade;
  enviarSinistralidade = false;
  reajuste: Reajuste = new Reajuste;
  enviarReajuste = false;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
    });

    // DADOS DA EMPRESA PRINCIPAL
    $('#filial').on('change', function () {
      if ($(this).is(":checked") == true) {
        $('#divFilial').fadeIn('100');
        $('#CNPJ_empresa_principal').prop('required', 'required');
        $('#razao_social_principal').prop('required', 'required');
      } else {
        $('#divFilial').hide();
        $('#CNPJ_empresa_principal').prop('required', '');
        $('#razao_social_principal').prop('required', '');
      }
    });

    // TELA DE ANEXO DO DOCUMENTO DA EMPRESA
    $('#dataRecebimento').on('blur', function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#dataRecebimento').on('focus', function () {
      $(this).siblings('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#vinc-anexo-empresa').hide();
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
    $('#vinc-vigencia').hide();
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

    // OPÇÕES

    $('input, select, textarea').keypress(
      function (
        event: {
          which: number;
          preventDefault: () => void;
        }
      ) {
        if (event.which == 13) {
          event.preventDefault();
        }
      }
    );

    $('#tipo_contrato').on('change', function () {
      if ('Operadora' === $(this).val()) {
        $('#operadora').fadeIn('100');
        $('#seguradora').hide();
        $('#formularioSeguradora').each (function(){
          this.reset();
        });
      } else if ('Seguradora' === $(this).val()) {
        $('#seguradora').fadeIn('100');
        $('#operadora').hide();
        $('#formularioOperadora').each (function(){
          this.reset();
        });
      } else {
        $('#operadora').hide();
        $('#seguradora').hide();
      }
    });
  }


  newEmpresa() {
    
    let urlEmpresa = 'empresa/';
    if (this.empresa.is_filial == true) {
      urlEmpresa = 'filial/'
      console.log(this.empresa);
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
      urlTipo = 'contrato-seguradora/'
      dados = this.contratoSeguradora;
    }

    dados.empresa = this.empresa.id
    console.log(dados)
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
      console.log(this.sinistralidade);
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
