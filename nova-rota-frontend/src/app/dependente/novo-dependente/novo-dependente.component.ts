import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Dependente, Titular } from '../models';
import { validarCPF } from '../../shared/validador-cpf';
import { Erro } from 'src/app/shared/erros';

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
  resultadoTitular = [];
  buscaTitular: Titular[] = [];
  //
  busca: Titular[];
  dependente: Dependente = new Dependente();
  cpfValido = true;
  p: number = 1;

  constructor(private toastrService: ToastrService, private api: ApiService) {
    this.getTitularesAtivos();
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
    
    // BOTÃO DE REGRA DE CONSULTA
    $('#consultarCPFdep').click(function () {
      $('#appearCadDep').fadeIn(200);
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

    // FECHAR TELA DE CONFIRMAÇÃO DEPENDENTE

    $('#fecharTelaDependente').click(function () {
      $('#confirmacaoDependente').fadeOut('100');
    });

    //
  }

  getTitularesAtivos = () => {
    this.api.listar('titular/?ativo=true').subscribe(
      (data) => {
        this.titulares = data;
        this.buscaTitular = data;
      },
      (error) => {
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  // VINCULAR DEPENDENTE
  searchNomeTitDep(nome: string) {
    if (nome != '') {
      this.buscaTitular = this.titulares.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.buscaTitular = this.titulares;
    }
  }

  titularClickedDependente = (titular: any) => {
    $('#vinc-titular').fadeOut('200');
    $('#encounter-tit').slideDown('200');

    this.api.selecionar('titular/', titular.id).subscribe(
      (data) => {
        this.dependente.titular = titular.id;
        this.dependente.titular_nome = titular.nome;
        this.toastrService.success('Titular vinculado com sucesso!');
      },
      (error) => {
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  validarCPF(cpf: string) {
    $('#InvalidCPF').hide();
    $('#CPFCadastrado').fadeOut(100);
    if (validarCPF(cpf) == false) {
      this.cpfValido = false;
      $('#InvalidCPF').fadeIn(100);
    } else {
      this.api.listar(`parentesco/?CPF=${cpf}`).subscribe((data) => {
        if (data.length > 0) {
          this.cpfValido = false;
          $('#CPFCadastrado').fadeIn(100);
        } else {
          this.cpfValido = true;
        }
      });
    }
  }

  newDependente() {
    this.dependente.ativo = true;
    this.api.inserirComArquivo('parentesco/', this.dependente).subscribe(
      (data) => {
        $('#confirmacaoDependente').fadeIn('100');
        $('#encounter-tit').fadeOut('100');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  anexoParentescoInput(files: FileList) {
    this.dependente.anexo_doc_parentesco = files.item(0);
  }

  anexoCasamentoInput(files: FileList) {
    this.dependente.anexo_doc_casamento = files.item(0);
  }

  anexoNascimentoInput(files: FileList) {
    this.dependente.anexo_doc_nascimento = files.item(0);
  }
}
