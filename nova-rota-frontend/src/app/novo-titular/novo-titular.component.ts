import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-novo-titular',
  templateUrl: './novo-titular.component.html',
  styleUrls: ['./novo-titular.component.css'],
})
export class NovoTitularComponent implements OnInit {
  titular = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_benef: '',
    data_nascimento: '',
    sexo: '',
    carteirinha: '',
    estado_civil: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: null,
    anexo_doc_casamento: null,
    anexo_doc_empregaticio: null,
    CEP: '',
    celular: '',
    cidade: '',
    estado: '',
    declaracao_saude: '',
    status: '',
    desc_declarao_saude: '',
    observacoes: null,
  };

  titulares = [
    {
      id: 0,
      CPF: '',
      nome_benef: '',
    },
  ];

  anex_doc_casamento: any;
  CPF: any;

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

    // TELA DE ANEXO ESTADO CIVIL

    $('#estado_civil').on('change', function () {
      'Casado(a)' === $(this).val()
        ? $('#vinc-anexo-casado').fadeIn('100')
        : $('#vinc-anexo-casado').fadeOut('100');
      //
      'Selecione' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
      //
      'Solteiro' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
      //
      'Convivente' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
    });

    $('#fecharAnexo').click(function () {
      $('#vinc-anexo-casado').fadeOut('100');
      $('#reanexar').fadeIn('100');
      $('#datacasamento').fadeIn('100');
    });

    $('#abrirAnexo').click(function () {
      $('#vinc-anexo-casado').fadeIn('100');
    });
    //

    // TELA DE VINCULO EMPREGATICIO
    $('#dataAdmissao').on('blur', function () {
      $('#vinc-anexo-empregaticio').fadeIn('100');
    });
    $('#dataAdmissao').on('focus', function () {
      $(this).siblings('#vinc-anexo-empregaticio').fadeIn('100');
    });
    $('#vinc-anexo-empregaticio').hide();
    //
    $('#fecharAnexo4').click(function () {
      $('#vinc-anexo-empregaticio').fadeOut('100');
      $('#reanexar4').fadeIn('100');
    });

    $('#abrirAnexo4').click(function () {
      $('#vinc-anexo-empregaticio').fadeIn('100');
    });

     // CONFIRMAÇÃO DECLARAÇÃO SAÚDE

     $('#declaracaoSaudeTitular').on('change', function () {
      'Sim' === $(this).val()
        ? $('#descDeclaracaoSaudeTitular').fadeIn('100')
        : $('#descDeclaracaoSaudeTitular').fadeOut('100');
    });
      //
  }

  // selectedFile: File = null;
  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  newTitular() {
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    this.api.saveNewTitular(this.titular).subscribe(
      (data) => {
        this.toastr.success('Titular inserido com sucesso!');
        this.appComponent.titular.push(data);
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
