import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
})
export class NovaEmpresaComponent implements OnInit {
  empresa = {
    id: 0,
    CNPJ: '',
    cod_empresa: '',
    razao_social: '',
    tipo: '',
    vencimento_boleto: '',
    inicio_vigencia: '',
    data_recebimento: '',
    anexo_doc_casamento: null,
    anexo_doc_empregaticio: null,
    celular: '',
    cidade: '',
    estado: '',
    cod_apolice: '',
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
    $('#fecharAnexo6').click(function () {
      $('#vinc-vigencia').fadeOut('100');
      $('#vigenciaTela').fadeIn('100');
    });

    $('#abrirVigencia').click(function () {
      $('#vinc-vigencia').fadeIn('100');
    });
  }

  // selectedFile: File = null;
  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  newEmpresa() {
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    this.api.saveNewEmpresa(this.empresa).subscribe(
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
