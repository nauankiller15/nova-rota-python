import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import {
  ContratoOperadora,
  ContratoSeguradora,
  Empresa,
  Reajuste,
  Sinistralidade,
} from '../models';
import { validarCNPJ } from '../../shared/validador-cnpj';
import { Erro } from 'src/app/shared/erros';

declare var $: any;

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
})
export class NovaEmpresaComponent implements OnInit {
  empresa: Empresa = new Empresa();
  cnpjValido = true;
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora();
  contratoOperadora: ContratoOperadora = new ContratoOperadora();
  sinistralidade: Sinistralidade = new Sinistralidade();
  enviarSinistralidade = false;
  reajuste: Reajuste = new Reajuste();
  enviarReajuste = false;

  constructor(private toastrService: ToastrService, private api: ApiService) {}

  ngOnInit(): void {
    $(window).on('load', function () {
      $('#resetEmp').trigger('click');
    });
    //
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
    });

    // VALIDAR CNPJ EMP PRINCIPAL
    $('#CNPJprincipal').on('change', function () {
      if (validarCNPJ(this.value) == false) {
        console.log('cnpj invalido');
        $(this).addClass('is-invalid ng-invalid');
        $(this).removeClass('ng-valid is-valid');
        $('#InvalidCNPJprincipal').fadeIn(100);
      } else {
        $('#InvalidCNPJprincipal').hide();
        $(this).removeClass('is-invalid ng-invalid');
        $(this).addClass('ng-valid is-valid');
      }
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
    $('#fecharAnexo6').click(function () {
      $('#vinc-anexo-empresa').fadeOut('100');
      $('#reanexar5').fadeIn('100');
    });

    $('#abrirAnexo5').click(function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });

    // // TELA DE VIG??NCIA
    // $('#dataVigencia').on('blur', function () {
    //   $('#vinc-vigencia').fadeIn('100');
    // });
    // $('#dataVigencia').on('focus', function () {
    //   $(this).siblings('#vinc-vigencia').fadeIn('100');
    // });
    // $('#vinc-vigencia').slideUp();
    // //

    // NOVA INCLUS??O VIG??NCIA
    $('#includeVigencia').click(function () {
      $('#vinc-vigencia').fadeIn('100');
    });
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

    // FECHAR TELA DE INCLUS??O DE PRODUTO
    $('#fecharProduto').click(function () {
      $('#vinc-produtos').fadeOut('100');
    });
    // 

    // BOT??ES DE ESCOLHA
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });

    // OP????ES

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

    $('#tipo_contrato').on('change', function () {
      if ('Operadora' === $(this).val()) {
        $('#operadora').slideDown('100');
        $('#seguradora').slideUp();
        $('#formularioSeguradora').each(function () {
          this.reset();
        });
      } else if ('Seguradora' === $(this).val()) {
        $('#seguradora').slideDown('100');
        $('#operadora').slideUp();
        $('#formularioOperadora').each(function () {
          this.reset();
        });
      } else {
        $('#operadora').slideUp();
        $('#seguradora').slideUp();
      }
    });
    // FECHAR TELA DE CONFIRMA????O EMPRESA
    $('#fecharTelaEmpresa').click(function () {
      $('#confirmacaoEmpresa').fadeOut(200);
    });
    $('.apagarEmp').click(function () {
      $('form').each(function () {
        this.reset();
      });
    });

    // SLIDE LEFT AND RIGHT TIPOS DE PRODUTOS
    $('#variosProdutos').click(function () {
      $('#variosProdutosTab').slideDown('100');
      $('#umProdutoTab').slideUp('100');
    });
    $('#umProduto').click(function () {
      $('#umProdutoTab').slideDown('100');
      $('#variosProdutosTab').slideUp('100');
    });
  }

  // CADASTRO DE EMPRESAS
  empresaPrincipal() {
    this.empresa.is_filial = false;
    $('#divFilial').slideUp(250);
    //
    $('#changeEmpFilial').slideUp('100');
    $('#changeEmpPrincipal').slideDown('100');
    // ANIMA????O SELE????O DOS DADOS FILIAIS
    $('.filialSelect').slideUp('100');
    $('.inserirFilial').slideUp('100');
  }

  empresaFilial() {
    $('#divFilial').fadeIn(250);
    this.empresa.is_filial = true;
    //
    $('#changeEmpPrincipal').slideUp('100');
    $('#changeEmpFilial').slideDown('100');
    // ANIMA????O SELE????O DOS DADOS FILIAIS
    $('.filialSelect').slideDown('100');
    $('.inserirFilial').slideDown('100');
  }

  validarCNPJ(cnpj: string) {
    $('#InvalidCNPJ').hide();
    $('#CNPJCadastrado').fadeOut(100);
    if (validarCNPJ(cnpj) == false) {
      this.cnpjValido = false;
      $('#InvalidCNPJ').fadeIn(100);
    } else {
      let urlEmpresa = 'empresa/';
      if (this.empresa.is_filial == true) {
        urlEmpresa = 'filial/';
      }
      this.api.listar(`${urlEmpresa}?CNPJ=${cnpj}`).subscribe(
        (data) => {
          if (data.length > 0) {
            this.cnpjValido = false;
            $('#CNPJCadastrado').fadeIn(100);
          } else {
            this.cnpjValido = true;
          }
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    }
  }

  // INCLUIR PRODUTOS
  newProduto() {
    $('#vinc-produtos').fadeIn(200);
  }
  //

  newEmpresa() {
    let urlEmpresa = 'empresa/';
    if (this.empresa.is_filial == true) {
      urlEmpresa = 'filial/';
    }

    this.api.inserirComArquivo(urlEmpresa, this.empresa).subscribe(
      (data) => {
        this.empresa.id = data.id;
        this.newContrato();
        this.newReajuste();
        this.newSinistralidade();
        $('#confirmacaoEmpresa').fadeIn('100');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  anexoEmpresaInput(files: FileList) {
    this.empresa.anexo_doc_emp = files.item(0);
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
        this.toastrService.success('Empresa inclu??da com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  newSinistralidade() {
    if (this.enviarSinistralidade == true) {
      this.sinistralidade.empresa = this.empresa.id;
      this.api.inserir('sinistralidade/', this.sinistralidade).subscribe(
        (data) => {
          this.toastrService.success('Sinistralidade inclu??da com sucesso!');
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    }
  }

  newReajuste() {
    if (this.enviarReajuste == true) {
      this.reajuste.empresa = this.empresa.id;
      this.api.inserir('reajuste/', this.reajuste).subscribe(
        (data) => {
          this.toastrService.success('Reajuste inclu??do com sucesso!');
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    }
  }
}
