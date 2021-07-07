import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Empresa } from '../nova-empresa/models';

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

  selected_empresa: Empresa;

  empresas: Empresa[];

  CNPJ: any;
  razao_social: string;
  fileToUpload: File = null;
  p: number = 1;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
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
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 0000-0000');
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
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

  searchCNPJ(CNPJ) {
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

  searchEmpresa(razaoSocial) {
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
    this.api.listar('empresa/').subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadEmpresa(id: string) {
    this.api.selecionar('empresa/', id).subscribe(
      (data) => {
        this.selected_empresa = data;
      },
      (error) => {
        this.toastr.error('Titular não encontrado', error.message);
      }
    );
  }

  empresaClicked = (empresa: { id: string }) => {
    $('#consulta').fadeOut('200');
    $('#empresaappear').fadeIn('200');
    this.api.selecionar('empresa/', empresa.id).subscribe(
      (data) => {
        this.selected_empresa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateEmp() {
    this.api.inserir('empresa/', this.selected_empresa).subscribe(
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
