import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { ContratoOperadora, ContratoSeguradora, Empresa, Reajuste, Sinistralidade } from '../nova-empresa/models';

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


  // DADOS DA EMPRESA
  busca: Empresa[];
  empresas: Empresa[];
  empresa: Empresa = new Empresa;
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora;
  contratoOperadora: ContratoOperadora= new ContratoOperadora;

  sinistralidades: Sinistralidade[];
  sinistralidade: Sinistralidade = new Sinistralidade;
  enviarSinistralidade = false;
  
  reajustes: Reajuste[];
  reajuste: Reajuste = new Reajuste;
  enviarReajuste = false;

  CNPJ: any;
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
    $('#dataVigenciaAlt').on('blur', function () {
      $('#vinc-vigenciaAlt').fadeIn('100');
    });
    $('#dataVigenciaAlt').on('focus', function () {
      $(this).siblings('#vinc-vigenciaAlt').fadeIn('100');
    });
    $('#vinc-vigenciaAlt').hide();
    //
    $('#fecharVigenciaAlt').click(function () {
      $('#vinc-vigenciaAlt').fadeOut('100');
      $('#vigenciaTela').fadeIn('100');
    });

    $('#abrirVigenciaAlt').click(function () {
      $('#vinc-vigenciaAlt').fadeIn('100');
    });

    // SLIDE LEFT AND RIGHT AJUSTES
    $('#sinistralidadeBtnAlt').click(function () {
      $('#sinisTabAlt').slideDown('100');
      $('#reajustTabAlt').slideUp('100');
    });
    $('#reajusteBtnAlt').click(function () {
      $('#reajustTabAlt').slideDown('100');
      $('#sinisTabAlt').slideUp('100');
    });

    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
  }

  searchCNPJ(CNPJ: string) {
    console.log(CNPJ)
    if (CNPJ != '') {
      this.busca = this.empresas.filter((res) => {
        return res.CNPJ.match(CNPJ);
      });
    } else if (CNPJ == '') {
      this.busca = this.empresas;
    }
  }

  searchEmpresa(razaoSocial: string) {
    if (razaoSocial != '') {
      this.busca = this.empresas.filter((res) => {
        return res.razao_social
          .toLocaleLowerCase()
          .match(razaoSocial.toLocaleLowerCase());
      });
    } else if (razaoSocial == '') {
      this.busca = this.empresas;
    }
  }

  getEmpresas() {
    this.api.listar('empresa/').subscribe(
      (data) => {
        this.empresas = data;
        this.busca = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadEmpresa(id: string) {
    this.api.selecionar('empresa/', id).subscribe(
      (data) => {
        this.empresa = data;
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
        this.empresa = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateEmp() {
    this.api.inserir('empresa/', this.empresa).subscribe(
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

  newEmpresa() {
    this.api.inserir('empresa/', this.empresa).subscribe(
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

  newContrato() {
    let urlTipo: string;
    let dados: any;
    if (this.empresa.tipo_contrato == 'Operadora') {
      urlTipo = 'contrato-operadora/';
      dados = this.contratoOperadora;
    } else {
      urlTipo = 'contrato-seguradora/';
      dados = this.contratoSeguradora;
    }

    dados.empresa = this.empresa.id;
    console.log(dados);
    this.api.inserir(urlTipo, dados).subscribe(
      (data) => {
        this.toastr.success('Empresa incluída com sucesso!');
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  newSinistralidade() {
    if (this.enviarSinistralidade == true) {
      this.sinistralidade.empresa = this.empresa.id;
      console.log(this.sinistralidade);
      this.api.inserir('sinistralidade/', this.sinistralidade).subscribe(
        (data) => {
          this.toastr.success('Sinistralidade incluída com sucesso!');
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

  newReajuste() {
    if (this.enviarReajuste == true) {
      this.reajuste.empresa = this.empresa.id;
      this.api.inserir('reajuste/', this.reajuste).subscribe(
        (data) => {
          this.toastr.success('Reajuste incluído com sucesso!');
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
}
