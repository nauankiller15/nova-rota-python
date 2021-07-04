import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-alteracao-empresa',
  templateUrl: './alteracao-empresa.component.html',
  styleUrls: ['./alteracao-empresa.component.css'],
})
export class AlteracaoEmpresaComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  //

  selected_empresa = {
    id: 0,
    CNPJ: '00.000.000/0000-00',
    cod_empresa: '',
    razao_social: '',
    tipo_contrato: '',
    operadora: '',
    operadora_nome: '',
    seguradora: '',
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

  CNPJ: any;

  fileToUpload: File = null;
  razao_social: string;
  p: number = 1;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.getEmpresas();
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
    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardados-empresa').click(function () {
      $('#empresaappear').fadeOut('200');
      $('#consulta').slideDown('200');
    });

    $('#abrirAnexoEmp').click(function () {
      $('#vinc-anexo-emp').fadeIn('100');
    });

    $('#fecharAnexoEmp').click(function () {
      $('#vinc-anexo-emp').fadeOut('100');
    });

    // TELA DE VIGÊNCIA
    $('#dataVigencia').on('blur', function () {
      $('#vinc-vigenciaAlt').fadeIn('100');
    });
    $('#dataVigencia').on('focus', function () {
      $(this).siblings('#vinc-vigenciaAlt').fadeIn('100');
    });
    $('#vinc-vigenciaAlt').hide();
    //
    $('#fecharVigencia').click(function () {
      $('#vinc-vigenciaAlt').fadeOut('100');
      $('#vigenciaTela').fadeIn('100');
    });

    $('#abrirVigenciaAlt').click(function () {
      $('#vinc-vigenciaAlt').fadeIn('100');
    });

    // SLIDE LEFT AND RIGHT AJUSTES
    $('#sinistralidadeBtn').click(function () {
      $('#sinisTab').slideDown('100');
      $('#reajusTab').slideUp('100');
    });
    $('#reajusteBtn').click(function () {
      $('#reajusTab').slideDown('100');
      $('#sinisTab').slideUp('100');
    });

    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
  }

  searchCNPJ() {
    if (this.CNPJ != '') {
      this.empresas = this.empresas.filter((res) => {
        return res.CNPJ.toLocaleLowerCase().match(
          this.CNPJ.toLocaleLowerCase()
        );
      });
    } else if (this.CNPJ == '') {
      this.getEmpresas();
    }
  }

  searchEmpresa() {
    if (this.razao_social != '') {
      this.empresas = this.empresas.filter((res) => {
        return res.razao_social
          .toLocaleLowerCase()
          .match(this.razao_social.toLocaleLowerCase());
      });
    } else if (this.razao_social == '') {
      this.getEmpresas();
    }
  }

  getEmpresas = () => {
    this.api.getAllEmpresas().subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadEmpresa(id: string) {
    this.api.getEmpresa(id).subscribe(
      (data) => {
        this.selected_empresa = data;
      },
      (error) => {
        this.toastr.error('Titular não encontrado', error.message);
      }
    );
  }

  empresaClicked = (titular: { id: string }) => {
    $('#consulta').fadeOut('200');
    $('#empresaappear').fadeIn('200');
    this.api.getEmpresa(titular.id).subscribe(
      (data) => {
        this.selected_empresa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateEmp() {
    this.api.updateEmpresa(this.selected_empresa).subscribe(
      (data: {}) => {
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
