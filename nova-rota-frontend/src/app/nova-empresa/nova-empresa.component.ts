import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { ContratoOperadora, ContratoSeguradora, Empresa, Reajuste, Sinistralidade } from './models';

declare var $: any;

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css'],
})
export class NovaEmpresaComponent implements OnInit {
  empresa: Empresa = new Empresa;
  contratoSeguradora: ContratoSeguradora = new ContratoSeguradora;
  contratoOperadora: ContratoOperadora = new ContratoOperadora;
  sinistralidade: Sinistralidade = new Sinistralidade;
  reajuste: Reajuste = new Reajuste;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private appComponent: AppComponent,
  ) {}

  ngOnInit(): void {
    console.log(this.empresa);
    console.log(this.contratoSeguradora);
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cnpj').mask('00.000.000/0000-00', { reverse: false });
    });

    // TELA DE ANEXO DO DOCUMENTO DA EMPRESA
    $('#dataRecebimento').on('blur', function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#dataRecebimento').on('focus', function () {
      $(this).siblings('#vinc-anexo-empresa').fadeIn('100');
    });
    $('#vinc-anexo-empresa').hide();
    //
    $('#fecharAnexo5').click(function () {
      $('#vinc-anexo-empresa').fadeOut('100');
      $('#reanexar5').fadeIn('100');
    });

    $('#abrirAnexo5').click(function () {
      $('#vinc-anexo-empresa').fadeIn('100');
    });

    // TELA DE VIGÊNCIA
    $('#dataVigencia').on('blur', function () {
      $('#vinc-vigencia').fadeIn('100');
    });
    $('#dataVigencia').on('focus', function () {
      $(this).siblings('#vinc-vigencia').fadeIn('100');
    });
    $('#vinc-vigencia').hide();
    //
    $('#fecharVigencia').click(function () {
      $('#vinc-vigencia').fadeOut('100');
      $('#vigenciaTela').fadeIn('100');
    });

    $('#abrirVigencia').click(function () {
      $('#vinc-vigencia').fadeIn('100');
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

    // OPÇÕES

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

    $('#tipo_contrato').on('change', function () {
      if ('Operadora' === $(this).val()) {
        $('#operadora').fadeIn('100');
        $('#seguradora').hide();
        $('#formularioSeguradora').each (function(){
          this.reset();
        });
      } else if ('Seguradora' === $(this).val()) {
        $('#seguradora').fadeIn('100');
        $('#operadora').hide();
        $('#formularioOperadora').each (function(){
          this.reset();
        });
      } else {
        $('#operadora').hide();
        $('#seguradora').hide();
      }
      //
    });
  }

  // selectedFile: File = null;
  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  newEmpresa() {
    console.log(this.empresa);
    console.log(this.contratoOperadora);
    console.log(this.contratoSeguradora);
    console.log(this.sinistralidade);
    console.log(this.reajuste);

    this.api.inserir('empresa/', this.empresa).subscribe(
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

    if (this.empresa.tipo_contrato == 'Operadora') {
      this.api.inserir('contrato-operadora/', this.contratoOperadora).subscribe(
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
    } else {
      this.api.inserir('contrato-operadora/', this.contratoSeguradora).subscribe(
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
  }
}
