import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';
import { Dependente, Titular } from '../novo-dependente/models';

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
  fileToUpload: File = null;
  CPF: string;
  nome_dependente: string;
  nome_benef: string;
  selected_titular: any;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private homeComponent: HomeComponent,
    private route: ActivatedRoute
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

  searchNomeBenef(nome_dependente: string) {
    if (nome_dependente != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.nome_dependente.match(nome_dependente);
      });
    } else if (nome_dependente == '') {
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

  getDependentes() {
    this.api.listar('parentesco/').subscribe(
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

  loadDependente(id: string) {
    this.api.selecionar('parentesco/', id).subscribe(
      (data) => {
        this.dependente = data;
      },
      (error) => {
        this.toastr.error('Dependente não encontrado', error.message);
      }
    );
  }

  // VINCULAR DEPENDENTE
  searchNomeTitDep(nome_benef: string) {
    if (nome_benef != '') {
      this.buscaTitularAlt = this.titulares.filter((res) => {
        return res.nome_benef.match(nome_benef);
      });
    } else if (nome_benef == '') {
      this.buscaTitularAlt = this.titulares;
    }
  }

  titularClickedDependente = (titular: any) => {
    $('#alterar-titular').fadeOut('200');
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

  dependenteClicked = (dependentes: { id: any }) => {
    $('#encounter-tit').fadeOut('100');
    $('#consulta2').slideUp(250);
    $('#dependentesappear').slideDown(250);
    $('#postDep').slideDown(600);
    this.api.selecionar('parentesco/', dependentes.id).subscribe(
      (data) => {
        this.dependente = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateDependente() {
    this.api.atualizar('parentesco/', this.dependente).subscribe(
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
}
