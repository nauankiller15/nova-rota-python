import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';
import { Dependente, Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-alteracao-dependente',
  templateUrl: './alteracao-dependente.component.html',
  styleUrls: ['./alteracao-dependente.component.css'],
})
export class AlteracaoDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];
  dependentes: Dependente[] = [];
  dependente: Dependente = new Dependente();
  campos = [
    'id', 'nome', 'CPF', 'cod_empresa', 'carteirinha', 'prioridade', 'data_recebimento', 'tipo', 'data_nascimento',
    'data_casamento', 'sexo', 'estado_civil', 'tipo_parentesco', 'nome_mae', 'data_admissao', 'titular',
    'CEP', 'celular', 'cidade', 'estado', 'declaracao_saude', 'desc_declarao_saude', 'observacoes', 
    'ativo', 'titular_nome'
  ];
  anexo_doc_parentesco: File;
  anexo_doc_casamento: File;
  anexo_doc_nascimento: File;

  // BUSCA DOS TITULARES
  buscaTitularAlt: Titular[] = [];
  titulares: Titular[] = [];

  //
  //
  intervalId: number | null = null;
  //

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  p: number = 1;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
  ) {
    this.getDependentesAtivos();
    this.getTitularesAtivos();
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

    // ALTERAR O TITULAR
    $('#alterar-titular-btn').click(function () {
      $('#alterar-titular').fadeIn('200');
    });

    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardadosdep').click(function () {
      $('#dependentesappear').fadeOut('200');
      $('#consulta2').slideDown('200');
      $('#postDep').slideUp(600);
    });

    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardadosDependente').click(function () {
      $('#Dependentesappear').fadeOut('200');
      $('#consulta').slideDown('200');
    });

    $('#abrirAnexoAltDependente').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoAltDependente').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.dependentes;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.dependentes;
    }
  }

  getDependentesAtivos() {
    this.api.listar('parentesco/?ativo=true').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  getDependentesInativos() {
    this.api.listar('parentesco/?ativo=false').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  getTitularesAtivos = () => {
    this.api.listar('titular/?ativo=true').subscribe(
      (data) => {
        this.titulares = data;
        this.buscaTitularAlt = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  // VINCULAR DEPENDENTE
  searchNomeTitDep(nome: string) {
    if (nome != '') {
      this.buscaTitularAlt = this.titulares.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.buscaTitularAlt = this.titulares;
    }
  }

  titularClickedDependente(titular: Titular) {
    $('#alterar-titular').fadeOut('200');
    $('#encounter-tit').slideDown('200');

    this.dependente.titular = titular.id;
    this.dependente.titular_nome = titular.nome;
    this.toastr.success('Titular vinculado com sucesso!');
  };

  dependenteClicked = (dependente: Dependente) => {
    $('#encounter-tit').fadeOut('100');
    $('#consulta2').slideUp(250);
    $('#dependentesappear').slideDown(250);
    $('#postDep').slideDown(600);
    
    this.campos.forEach(campo => {
      this.dependente[campo] = dependente[campo];
    }); 

    this.anexo_doc_casamento = dependente.anexo_doc_casamento;
    this.anexo_doc_nascimento = dependente.anexo_doc_nascimento;
    this.anexo_doc_parentesco = dependente.anexo_doc_parentesco;
  };

  depAtivo() {
    this.getDependentesAtivos();
    $('.menuVigencia').removeClass('canceladoBorder');
    $('.menuItems li').siblings().removeClass('canceladoBtn');
    $('.menuItems li').addClass('active');
    $('.cancelados').removeClass('canceladoBtn');
    $('.cancelados').removeClass('active');
  }
  depCancelado() {
    this.getDependentesInativos();
    $('.menuVigencia').addClass('canceladoBorder');
    $('.cancelados').addClass('canceladoBtn');
    $('.radiusTop').removeClass('active');
    $('.cancelados').removeClass('active');
  }

  updateDependente() {
            
    this.api.atualizarComArquivo('parentesco/', this.dependente).subscribe(
      (data) => {
        this.dependente = data;
        this.toastr.success('Atualizado com sucesso!');      
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  anexoParentescoInput(files: FileList) {
    this.dependente.anexo_doc_parentesco = files.item(0);
  }

  anexoCasamentoInput(files: FileList) {
    this.dependente.anexo_doc_casamento = files.item(0);
  } 

  anexo_doc_nascimentoInput(files: FileList) {
    this.dependente.anexo_doc_nascimento = files.item(0);
  } 
}
