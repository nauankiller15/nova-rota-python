import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { HomeComponent } from '../home/home.component';
import { Dependente, Titular } from '../novo-dependente/models';

declare var $: any;

@Component({
  selector: 'app-cancelamento-dependente',
  templateUrl: './cancelamento-dependente.component.html',
  styleUrls: ['./cancelamento-dependente.component.css'],
})
export class CancelamentoDependenteComponent implements OnInit {
  // CARREGADOR

  data_casamento: Dependente[] = [];
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[];

  // BUSCA DOS TITULARES
  buscaTitularAlt: Titular[] = [];

  dependentes: Dependente[];
  dependente: Dependente = new Dependente();

  //
  titulares: Titular[];
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
    this.getDependentes();
    this.getTitulares();
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
    $('#voltardadosdepConsulta').click(function () {
      $('#dependentesappearConsulta').fadeOut('200');
      $('#consulta3').slideDown('200');
      $('#postDepConsulta').slideUp(600);
    });

    $('#abrirAnexoConsultaDependente').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoConsultaDependente').click(function () {
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

  getTitulares = () => {
    this.api.listar('titular/').subscribe(
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

  dependenteClickedConsulta = (dependentes: { id: any }) => {
    $('#consulta3').slideUp(250);
    $('#dependentesappearConsulta').slideDown(250);
    $('#postDepConsulta').slideDown(600);
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
}
