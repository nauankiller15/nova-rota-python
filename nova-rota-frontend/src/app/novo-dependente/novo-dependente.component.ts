import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { Dependente, Titular } from './models';

declare var $: any;

@Component({
  selector: 'app-novo-dependente',
  templateUrl: './novo-dependente.component.html',
  styleUrls: ['./novo-dependente.component.css'],
})
export class NovoDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // BUSCA DOS TTULARES
  titulares: Titular[];
  buscaTitular: Titular[];
  //
  busca: Titular[];
  dependente: Dependente = new Dependente();
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
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cpf').mask('000.000.000-00', { reverse: false });
    });

    // VINCULAR TITULAR
    $('#vincular-titular-btn').click(function () {
      $('#vinc-titular').fadeIn('200');
    });

    // TELA DE ANEXO ESTADO CIVIL

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

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

    $('#fecharTelaDependente').click(function () {
      $('#confirmacaoDependente').fadeOut('100');
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
    this.api.listar('titular/').subscribe(
      (data) => {
        this.titulares = data;
        this.buscaTitular = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  // VINCULAR DEPENDENTE
  searchNomeTitDep(nome_benef: string) {
    if (nome_benef != '') {
      this.buscaTitular = this.titulares.filter((res) => {
        return res.nome_benef.match(nome_benef);
      });
    } else if (nome_benef == '') {
      this.buscaTitular = this.titulares;
    }
  }

  titularClickedDependente = (titular: any) => {
    $('#vinc-titular').fadeOut('200');
    $('#encounter-tit').slideDown('200');

    this.api.selecionar('titular/', titular.id).subscribe(
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
    this.api.inserir('parentesco/', this.dependente).subscribe(
      (data) => {
        $('#confirmacaoDependente').fadeIn('100');
        $('#encounter-tit').fadeOut('100');
        this.appComponent.dependente.push(data);
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
