import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Dependente, Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-consulta-dependente',
  templateUrl: './consulta-dependente.component.html',
  styleUrls: ['./consulta-dependente.component.css'],
})
export class ConsultaDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];

  dependentes: Dependente[] = [];
  dependente: Dependente = new Dependente();
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
  }

  ngOnInit(): void {
    // CARREGADOR TIMEOUT
    $(document).ready(() => {
      setTimeout(() => {
        this.contentLoaded = true;
      }, 2500);

      this.intervalId = window.setInterval(() => {
        this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
        this.count = this.count === 2 ? 5 : 2;
        this.widthHeightSizeInPixels =
          this.widthHeightSizeInPixels === 50 ? 100 : 50;
      }, 5000);
    });
    //---------------

    // MÁSCARAS DE INPUT
    $(document).ready(() => {
      $('.cpf').mask('000.000.000-00', { reverse: false });
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

  dependenteClickedConsulta = (dependente: Dependente) => {
    $('#consulta3').slideUp(250);
    $('#dependentesappearConsulta').slideDown(250);
    $('#postDepConsulta').slideDown(600);
    this.dependente = dependente;
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
}
