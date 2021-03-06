import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
import { validarCNPJ } from 'src/app/shared/validador-cnpj';
import { ApiService } from '../../api.service';
import {
  ContratoOperadora,
  ContratoSeguradora,
  Empresa,
  Reajuste,
  Sinistralidade,
} from '../models';

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
  busca: Empresa[] = [];

  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa();
  cnpjValido = true;
  //
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora();
  contratoOperadora: ContratoOperadora = new ContratoOperadora();

  sinistralidades: Sinistralidade[] = [];
  sinistralidade: Sinistralidade = new Sinistralidade();
  enviarSinistralidade = false;

  reajustes: Reajuste[] = [];
  reajuste: Reajuste = new Reajuste();
  enviarReajuste = false;

  p: number = 1;

  constructor(private toastrService: ToastrService, private api: ApiService) {
    this.getEmpresas();
  }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
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
      $('#postEmp').slideUp(600);
    });

    $('#abrirAnexoEmp').click(function () {
      $('#vinc-anexo-emp').fadeIn('100');
    });

    $('#fecharAnexoEmp').click(function () {
      $('#vinc-anexo-emp').fadeOut('100');
    });

    // BOTÕES
    $('.menuItems li').on('click', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });

    // Sinistralidade e Reajuste
    $('#reajuste-sinistralidade').on('click', function () {
      $('#vinc-vigenciaAlt').fadeIn(100);
      $('#tabelaReajuste').slideDown(250);
    });

    $('#fecharVigenciaAlt').on('click', function () {
      $('#formularioSinistralidade').slideUp(200);
      $('#formularioReajuste').slideUp(200);

      $('#vinc-vigenciaAlt').fadeOut(100);
      $('#tabelaReajuste').slideDown(200);
      $('#tabelaSinistro').slideDown(200);
    });

    $('#reajusteBtnAlt').on('click', function () {
      $('#formularioSinistralidade').slideUp(100);
      $('#reajusTabAlt').slideDown(300);
      $('#sinisTabAlt').slideUp(300);
      $('#tabelaReajuste').slideDown(200);
    });

    $('#sinistralidadeBtnAlt').on('click', function () {
      $('#tabelaSinistro').slideDown(200);
      $('#formularioReajuste').slideUp(100);
      $('#sinisTabAlt').slideDown(300);
      $('#reajusTabAlt').slideUp(300);
    });
  }

  searchCNPJ(CNPJ: string) {
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
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  empresaClicked = (empresa: Empresa) => {
    $('#consulta').slideUp(250);
    $('#empresaappear').slideDown(250);
    $('#postEmp').slideDown(600);
    this.empresa = empresa;
    this.loadDadosEmpresa();
  };

  validarCNPJ(cnpj: string) {
    $('#InvalidCNPJ').hide();
    $('#CNPJCadastrado').fadeOut(100);
    if (validarCNPJ(cnpj) == false) {
      this.cnpjValido = false
      $('#InvalidCNPJ').fadeIn(100);
    } else {
      let urlEmpresa = 'empresa/';
      if (this.empresa.is_filial == true) {
        urlEmpresa = 'filial/';
      }
      this.api.listar(`${urlEmpresa}?CNPJ=${cnpj}`).subscribe(
        (data) => {
          if (data.length > 0) {
            this.cnpjValido = false;
            $('#CNPJCadastrado').fadeIn(100);
          } else {
            this.cnpjValido = true;
          }
        }          
      );
    }
  }

  loadDadosEmpresa() {
    if (this.empresa.is_filial == true) {
      this.loadFilial();
    }

    this.loadReajustes(this.empresa.id);
    this.loadSinistralidades(this.empresa.id);
    this.loadContratoOperadora(this.empresa.id);
    this.loadContratoSeguradora(this.empresa.id);
  }

  loadFilial() {
    this.api.selecionar('filial/', this.empresa.id).subscribe((data) => {
      this.empresa = data;
    });
  }

  loadReajustes(empresa: number) {
    this.api.listar(`reajuste/?empresa=${empresa}`).subscribe(
      (data) => {
        this.reajustes = data;
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir(); 
      }
    );
  }

  loadSinistralidades(empresa: number) {
    this.api.listar(`sinistralidade/?empresa=${empresa}`).subscribe(
      (data) => {
        this.sinistralidades = data;
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir(); 
      }
    );
  }

  loadContratoOperadora(empresa: number) {
    this.api.listar(`contrato-operadora/?empresa=${empresa}`).subscribe(
      (data) => {
        if (data.length > 0) {
          this.contratoOperadora = data[0];
        } else {
          this.contratoOperadora = new ContratoOperadora();
        }
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir(); 
      }
    );
  }

  loadContratoSeguradora(empresa: number) {
    this.api.listar(`contrato-seguradora/?empresa=${empresa}`).subscribe(
      (data) => {
        if (data.length > 0) {
          this.contratoSeguradora = data[0];
        } else {
          this.contratoSeguradora = new ContratoSeguradora();
        }
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir(); 
      }
    );
  }

  atualizarEmpresa() {
    let urlEmpresa = 'empresa/';
    if (this.empresa.is_filial == true) {
      urlEmpresa = 'filial/';
    }

    this.api.atualizarComArquivo(urlEmpresa, this.empresa).subscribe(
      (data) => {
        this.atualizarContrato();
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
      erro.exibir(); 
      }
    );
  }

  anexoEmpresaInput(files: FileList) {
    this.empresa.anexo_doc_emp = files.item(0);
  } 

  atualizarContrato() {
    let urlTipo: string;
    let dados: any;

    if (this.empresa.tipo_contrato == 'Operadora') {
      urlTipo = 'contrato-operadora/';

      dados = this.contratoOperadora;
    } else {
      urlTipo = 'contrato-seguradora/';
      dados = this.contratoSeguradora;
    }

    if (dados.id) {
      this.api.atualizar(urlTipo, dados).subscribe(
        (data) => {
          this.loadDadosEmpresa();
          this.toastrService.success('Empresa atualizada com sucesso!');
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    } else {
      dados.empresa = this.empresa.id;
      this.api.inserir(urlTipo, dados).subscribe(
        (data) => {
          this.loadDadosEmpresa();
          this.toastrService.success('Empresa atualizada com sucesso!');
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    }
  }

  // REAJUSTE
  adicionarReajuste() {
    this.reajuste = new Reajuste();
    $('#formularioReajuste').slideDown(200);
    $('#cadastrarReajuste').fadeIn(100);
    $('#atualizarReajuste').hide();
  }

  newReajuste() {
    this.reajuste.empresa = this.empresa.id;
    this.api.inserir('reajuste/', this.reajuste).subscribe(
      (data) => {
        $('#formularioReajuste').hide();
        $('#cadastrarReajuste').hide();
        this.reajuste = new Reajuste();
        this.loadReajustes(this.empresa.id);
        this.toastrService.success('Reajuste incluído com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  editReajuste(reajuste: Reajuste) {
    this.reajuste = reajuste;
    $('#formularioReajuste').fadeIn(100);
    $('#atualizarReajuste').fadeIn(100);
    $('#cadastrarReajuste').slideUp(200);
    $('#tabelaReajuste').slideUp(200);
  }

  updateReajuste() {
    this.api.atualizar('reajuste/', this.reajuste).subscribe(
      (data) => {
        this.loadReajustes(this.empresa.id);
        $('#tabelaReajuste').slideDown(200);
        $('#formularioReajuste').slideUp(200);
        $('#atualizarReajuste').slideUp(200);
        this.toastrService.success('Reajuste atualizado com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  confirmarExclusaoReajuste(reajuste: Reajuste){
    console.log("exclusa de reajuste")
    this.reajuste = reajuste;
    $('#formularioReajuste').slideUp(200);
    $('#vinc-vigenciaAlt').fadeOut(100);
    $('#exclusaoReajuste').show();
  }

  apagarReajusteVoltar() {
    $('#exclusaoReajuste').hide();
  }

  apagarReajuste() {
    this.api.apagar('reajuste/', this.reajuste.id).subscribe(
      (data) => {
        this.loadReajustes(this.empresa.id);
        this.toastrService.success('Reajuste excluido com sucesso');
        $('#vinc-vigenciaAlt').fadeIn(100);
        $('#tabelaReajuste').slideDown(250);
        $('#exclusaoReajuste').hide();
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  // SINISTRALIDADE
  adicionarSinistralidade() {
    this.sinistralidade = new Sinistralidade();
    $('#formularioSinistralidade').slideDown(200);
    $('#cadastrarSinistralidade').fadeIn(100);
    $('#atualizarSinistralidade').slideUp(200);
  }

  newSinistralidade() {
    this.sinistralidade.empresa = this.empresa.id;
    this.api.inserir('sinistralidade/', this.sinistralidade).subscribe(
      (data) => {
        $('#formularioSinistralidade').slideUp(200);
        $('#cadastrarSinistralidade').slideUp(200);
        this.sinistralidade = new Sinistralidade();
        this.loadSinistralidades(this.empresa.id);
        this.toastrService.success('Sinistralidade incluída com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  editSinistralidade(sinistralidade: Sinistralidade) {
    this.sinistralidade = sinistralidade;
    $('#formularioSinistralidade').fadeIn(100);
    $('#atualizarSinistralidade').fadeIn(100);
    $('#cadastrarSinistralidade').slideUp(200);
    $('#tabelaSinistro').slideUp(200);
  }

  updateSinistralidade() {
    this.api.atualizar('sinistralidade/', this.sinistralidade).subscribe(
      (data) => {
        this.loadSinistralidades(this.empresa.id);
        $('#tabelaSinistro').slideDown(200);
        $('#formularioSinistralidade').slideUp(200);
        $('#atualizarSinistralidade').slideUp(200);
        this.toastrService.success('Sinistralidade atualizada com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  confirmarExclusaoSinistralidade(sinistralidade: Sinistralidade){
    this.sinistralidade = sinistralidade;
    $('#formularioReajuste').slideUp(200);
    $('#vinc-vigenciaAlt').fadeOut(100);
    $('#exclusaoSinistralidade').show();
  }

  apagarSinistralidadeVoltar() {
    $('#exclusaoSinistralidade').hide();
  }

  apagarSinistralidade() {
    this.api.apagar('sinistralidade/', this.sinistralidade.id).subscribe(
      (data) => {
        this.loadSinistralidades(this.empresa.id);
        this.toastrService.success('Reajuste excluido com sucesso');
        $('#vinc-vigenciaAlt').fadeIn(100);
        $('#tabelaReajuste').slideDown(250);
        $('#exclusaoSinistralidade').hide();
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }
}
