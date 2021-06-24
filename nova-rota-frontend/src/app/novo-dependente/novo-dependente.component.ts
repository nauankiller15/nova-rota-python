import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-novo-dependente',
  templateUrl: './novo-dependente.component.html',
  styleUrls: ['./novo-dependente.component.css'],
})
export class NovoDependenteComponent implements OnInit {
  titulares = [
    {
      id: 0,
      CPF: '',
      nome_benef: '',
    },
  ];
  dependente = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_dependente: '',
    data_nascimento: '',
    sexo: '',
    carteirinha: '',
    estado_civil: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: null,
    anexo_doc_casamento: null,
    anexo_doc_nascimento: null,
    tipo_parentesco: '',
    CEP: '',
    celular: '',
    cidade: '',
    estado: '',
    declaracao_saude: '',
    status: '',
    desc_declarao_saude: '',
    observacoes: null,
    titular: null,
    nome_benef: null,
  };

  dependentes = [
    {
      id: 0,
      CPF: '',
      nome_dependente: '',
    },
  ];
  nome_benef: string;
  selected_titular: any;
  id: number;
  p: number = 1;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private appComponent: AppComponent
  ) {
    this.getTitulares();
  }

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

    // VINCULAR TITULAR
    $('#vincular-titular-btn').click(function () {
      $('#vinc-titular').fadeIn('200');
    });

    // TELA DE ANEXO ESTADO CIVIL

    $('#estado_civil2').on('change', function () {
      'Casado(a)' === $(this).val()
        ? $('#vinc-anexo-casado').fadeIn('100')
        : $('#vinc-anexo-casado').fadeOut('100');
      //
      'Selecione' === $(this).val();
      $('#reanexar3').fadeOut('100');
      $('#datacasamentoDep').fadeOut('100');
      //
      'Solteiro' === $(this).val();
      $('#reanexar3').fadeOut('100');
      $('#datacasamentoDep').fadeOut('100');
      //
      'Convivente' === $(this).val();
      $('#reanexar3').fadeOut('100');
      $('imagemCasado').val('');
      $('#datacasamentoDep').fadeOut('100');
    });

    $('#fecharAnexo3').click(function () {
      $('#vinc-anexo-casado').fadeOut('100');
      $('#reanexar3').fadeIn('100');
      $('#datacasamentoDep').fadeIn('100');
    });

    $('#abrirAnexo3').click(function () {
      $('#vinc-anexo-casado').fadeIn('100');
    });

    //

    // TELA DE ANEXO FILHO OU CONJUGE

    $('#filhoConjuge').on('change', function () {
      'Filho(a)' === $(this).val()
      ? $('#vinc-anexo-conjugeFilho').fadeIn('100')
      : $('#vinc-anexo-conjugeFilho').fadeOut('100');
    //
    'Conjuge' === $(this).val();
      $('#reanexar2').fadeOut('100');
      //
      'Solteiro' === $(this).val();
      $('#reanexar2').fadeOut('100');
      //
    });

    $('#fecharAnexo2').click(function () {
      $('#vinc-anexo-conjugeFilho').fadeOut('100');
      $('#reanexar2').fadeIn('100');
    });

    $('#abrirAnexo2').click(function () {
      $('#vinc-anexo-conjugeFilho').fadeIn('100');
    });

    //


      // CONFIRMAÇÃO DECLARAÇÃO SAÚDE

      $('#declaracaoSaudeDependente').on('change', function () {
        'Sim' === $(this).val()
          ? $('#descDeclaracaoSaudeDependente').fadeIn('100')
          : $('#descDeclaracaoSaudeDependente').fadeOut('100');
      });
        //

  }

  getTitulares = () => {
    this.api.getAlltitulares().subscribe(
      (data) => {
        this.titulares = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  searchNomeTitDep() {
    if (this.nome_benef != '') {
      this.titulares = this.titulares.filter((res) => {
        return res.nome_benef
          .toLocaleLowerCase()
          .match(this.nome_benef.toLocaleLowerCase());
      });
    } else if (this.nome_benef == '') {
      this.getTitulares();
    }
  }

  titularClickedDependente = (titular: any) => {
    $('#vinc-titular').fadeOut('200');
    $('#encounter-tit').slideDown('200');

    this.api.getTitular(titular.id).subscribe(
      (data) => {
        this.dependente.titular = titular.id;
        this.dependente.nome_benef = titular.nome_benef;

        this.toastr.success('Titular vinculado com sucesso!');
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  newDependente() {
    this.api.saveNewDependente(this.dependente).subscribe(
      (data) => {
        this.toastr.success('Dependente inserido com sucesso!');
        this.appComponent.dependente.push(data);
      },
      (error: { message: string }) => {
        this.toastr.error('Dados necessários em branco!', error.message);
      }
    );
  }
}
