import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

declare var $: any;

@Component({
  selector: 'app-nova-empresa-filial',
  templateUrl: './nova-empresa-filial.component.html',
  styleUrls: ['./nova-empresa-filial.component.css'],
})
export class NovaEmpresaFilialComponent implements OnInit {
  empresa = {
    id: 0,
    CNPJ: '',
    cod_empresa: '',
    razao_social: '',
    tipo_contrato: '',
    operadora: '',
    operadora_nome: '',
    seguradora: 'Seguro de Vida',
    seguradora_nome: '',
    tipo: '',
    vencimento_boleto: '',
    inicio_vigencia: '',
    ano_vigencia: '',
    sinistralidade: '',
    tecnico: '',
    negociado: '',
    data_recebimento: '',
    anexo_doc_casamento: null,
    anexo_doc_empregaticio: null,
    celular: '',
    cidade: '',
    estado: '',
    codigo: '',
    apolice: '',
    status: '',
    observacoes: null,
  };

  empresas = [
    {
      id: 0,
      CNPJ: '',
      razao_social: '',
    },
  ];

  anex_doc_casamento: any;
  CNPJ: any;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private appComponent: AppComponent,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    $(document).ready(() => {
      $('.date').mask('00/00/0000');
      $('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      $('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 00000-0000');
      $('.phone_us').mask('(000) 000-0000');
      $('.mixed').mask('AAA 000-S0S');
      $('.CNPJ').mask('000.000.000-00', { reverse: false });
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

    // TELA DE ANEXO DO DOCUMENTO DA EMPRESA
    $('#dataRecebimento-filial').on('blur', function () {
      $('#vinc-anexo-empresa-filial').fadeIn('100');
    });
    $('#dataRecebimento-filial').on('focus', function () {
      $(this).siblings('#vinc-anexo-empresa-filial').fadeIn('100');
    });
    $('#vinc-anexo-empresa-filial').hide();
    //
    $('#fecharAnexo-filial').click(function () {
      $('#vinc-anexo-empresa-filial').fadeOut('100');
      $('#reanexar-filial').fadeIn('100');
    });

    $('#abrirAnexo-filial').click(function () {
      $('#vinc-anexo-empresa-filial').fadeIn('100');
    });

    // TELA DE VIGÊNCIA
    $('#dataVigencia-filial').on('blur', function () {
      $('#vinc-vigencia-filial').fadeIn('100');
    });
    $('#dataVigencia-filial').on('focus', function () {
      $(this).siblings('#vinc-vigencia').fadeIn('100');
    });
    $('#vinc-vigencia-filial').hide();
    //
    $('#fecharVigencia-filial').click(function () {
      $('#vinc-vigencia-filial').fadeOut('100');
      $('#vigenciaTela-filial').fadeIn('100');
    });

    $('#abrirVigencia-filial').click(function () {
      $('#vinc-vigencia-filial').fadeIn('100');
    });

    // SLIDE LEFT AND RIGHT AJUSTES
    $('#sinistralidadeBtn-filial').click(function () {
      $('#sinisTab-filial').slideDown('100');
      $('#reajusTab-filial').slideUp('100');
    });
    $('#reajusteBtn-filial').click(function () {
      $('#reajusTab-filial').slideDown('100');
      $('#sinisTab-filial').slideUp('100');
    });

    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });

    // OPÇÕES

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

    $('#tipo_contrato-filial').on('change', function () {
      if ('Operadora' === $(this).val()) {
        $('#operadoras-filial').fadeIn('100');
        $('#seguradoras-filial').hide();
        $('#nome_operadora-filial').fadeIn('100');
        $('#nome_seguradora-filial').fadeOut('100');
        $('#codigo-filial').fadeIn('100');
        $('#apolice-filial').fadeOut('100');
      } else {
        'Seguradora' === $(this).val();
        $('#seguradoras-filial').fadeIn('100');
        $('#operadoras-filial').hide();
        $('#nome_seguradora-filial').fadeIn('100');
        $('#nome_operadora-filial').fadeOut('100');
        $('#apolice-filial').fadeIn('100');
        $('#codigo-filial').fadeOut('100');
      }
      //
    });
  }

  // selectedFile: File = null;
  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  newEmpresa() {
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    this.api.inserir('empresa/', this.empresa).subscribe(
      (data) => {
        this.toastr.success('Empresa incluída com sucesso!');
        this.appComponent.titular.push(data);
      },
      (error: { message: string }) => {
        this.toastr.error('Dados necessários em branco!', error.message);
      }
    );
  }
}
