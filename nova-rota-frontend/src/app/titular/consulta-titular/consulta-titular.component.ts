import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-consulta-titular',
  templateUrl: './consulta-titular.component.html',
  styleUrls: ['./consulta-titular.component.css'],
})
export class ConsultaTitularComponent implements OnInit {
  // DADOS DO TITULAR
  busca: Titular[] = [];

  titulares: Titular[] = [];
  titular: Titular = new Titular();

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;
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

  constructor(private toastr: ToastrService, private api: ApiService) {
    this.getTitularesAtivos();
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
      $('.cep').mask('00000-000');
      $('.phone_with_ddd').mask('(00) 0000-0000');
      $('.cpf').mask('000.000.000-00', { reverse: false });
    });
    //
    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltardadosTitConsulta').click(function () {
      $('#titularesappearConsulta').fadeOut('200');
      $('#consulta4').slideDown('200');
      $('#postTitConsulta').slideUp(600);
    });

    $('#abrirAnexoConsulta2').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoConsulta2').click(function () {
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

  searchNomeBenef(nome_benef: string) {
    if (nome_benef != '') {
      this.busca = this.titulares.filter((res) => {
        return res.nome_benef.match(nome_benef);
      });
    } else if (nome_benef == '') {
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
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
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
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  }

  titularClickedConsulta(titular: Titular) {
    $('#consulta4').slideUp(250);
    $('#titularesappearConsulta').slideDown(250);
    $('#postTitConsulta').slideDown(600);
    $('#postTitConsulta').slideDown(600);
    this.titular = titular;
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
}
