import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { validarCPF } from 'src/app/shared/validador-cpf';
import { Titular } from '../models';
import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Erro } from 'src/app/shared/erros';

declare var $: any;

@Component({
  selector: 'app-alteracao-titular',
  templateUrl: './alteracao-titular.component.html',
  styleUrls: ['./alteracao-titular.component.css'],
})
export class AlteracaoTitularComponent implements OnInit {
  // DADOS DO TITULAR
  busca: Titular[] = [];
  titulares: Titular[] = [];
  titular: Titular = new Titular();
  cpfValido = true;
  campos = [
    'id',
    'nome',
    'CPF',
    'cod_empresa',
    'carteirinha',
    'prioridade',
    'data_recebimento',
    'data_nascimento',
    'data_casamento',
    'sexo',
    'estado_civil',
    'nome_mae',
    'data_admissao',
    'CEP',
    'celular',
    'cidade',
    'estado',
    'declaracao_saude',
    'desc_declarao_saude',
    'observacoes',
    'ativo',
    'criado_em',
  ];
  anexo_doc_casamento: File;
  anexo_doc_empregaticio: File;

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  //

  p: number = 1;

  constructor(private toastrService: ToastrService, private api: ApiService) {
    this.getTitularesAtivos();
  }

  ngOnInit(): void {
    lightGallery(document.getElementById('lightgallery'), {
      plugins: [lgZoom, lgThumbnail],
      speed: 500,
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
    // M??SCARAS DE INPUT
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.phone_with_ddd').mask('(00) 0000-0000');
      $('.cpf').mask('000.000.000-00', { reverse: false });
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
    });
    //
    // VOLTAR ALTERA????O DE DADOS
    $('#voltardados').click(function () {
      $('#titularesappear').fadeOut('200');
      $('#consulta').slideDown('200');
      $('#postTit').slideUp(600);
    });

    $('#abrirAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.titulares.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.titulares;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.titulares.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.titulares;
    }
  }

  getTitularesAtivos() {
    this.api.listar('titular/?ativo=true').subscribe(
      (data) => {
        this.titulares = data;
        this.busca = data;
        this.contentLoaded = true;
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  getTitularesInativos() {
    this.api.listar('titular/?ativo=false').subscribe(
      (data) => {
        this.titulares = data;
        this.busca = data;
        this.contentLoaded = true;
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  titularClicked(titular: Titular) {
    this.titular = new Titular();
    $('#consulta').slideUp(250);
    $('#titularesappear').slideDown(250);
    $('#postTit').slideDown(600);

    this.campos.forEach((campo) => {
      this.titular[campo] = titular[campo];
    });

    this.anexo_doc_casamento = titular.anexo_doc_casamento;
    this.anexo_doc_empregaticio = titular.anexo_doc_empregaticio;
  }

  validarCPF(cpf: string) {
    $('#InvalidCPF').hide();
    $('#CPFCadastrado').fadeOut(100);
    if (validarCPF(cpf) == false) {
      this.cpfValido = false;
      $('#InvalidCPF').fadeIn(100);
    } else {
      this.api.listar(`titular/?CPF=${cpf}`).subscribe((data) => {
        if (data.length > 0) {
          this.cpfValido = false;
          $('#CPFCadastrado').fadeIn(100);
        } else {
          this.cpfValido = true;
        }
      });
    }
  }

  titAtivo() {
    this.getTitularesAtivos();
    $('.menuVigencia').removeClass('canceladoBorder');
    $('.menuItems li').siblings().removeClass('canceladoBtn');
    $('.menuItems li').addClass('active');
    $('.cancelados').removeClass('canceladoBtn');
    $('.cancelados').removeClass('active');
  }

  titCancelado() {
    this.getTitularesInativos();
    $('.menuVigencia').addClass('canceladoBorder');
    $('.cancelados').addClass('canceladoBtn');
    $('.radiusTop').removeClass('active');
    $('.cancelados').removeClass('active');
  }

  updateTit() {
    this.api.atualizarComArquivo('titular/', this.titular).subscribe(
      (data) => {
        $('#atualizarCad').fadeOut(250);
        $('#unlockCad').fadeIn(250);
        this.titularClicked(data);
        this.toastrService.success('Atualizado com sucesso!');
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  novoDocumento() {
    $('#vinc-anexo-empregaticio').fadeIn('100');
  }

  fecharNovoDocumento() {
    $('#vinc-anexo-empregaticio').fadeOut('100');
  }

  vinculoEmpInput(files: FileList) {
    this.titular.anexo_doc_empregaticio = files.item(0);
    $('#atualizarCad').fadeIn(250);
    $('#unlockCad').fadeOut(250);
  }

  anexoCasamentoInput(files: FileList) {
    this.titular.anexo_doc_casamento = files.item(0);
  }

  confirmarAtualizacao() {
    $('#atualizarCarteirinha').fadeIn(100);
  }
  atualizarCarteirinhaVoltar() {
    $('#atualizarCarteirinha').fadeOut(100);
  }

  atualizarCarteirinha() {
    const atualizar = {
      id: this.titular.id,
      carteirinha: this.titular.carteirinha,
    };
    this.api.atualizarCampo('titular/', atualizar).subscribe(
      (data) => {
        this.toastrService.success('Carteirinha atualizada com sucesso!');
        if (this.titular.ativo == true) {
          this.getTitularesAtivos();
        } else {
          this.getTitularesInativos();
        }
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
    $('#atualizarCarteirinha').fadeOut(100);
  }
}
