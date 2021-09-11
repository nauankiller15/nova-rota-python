import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Titular } from '../models';
import { validarCPF } from '../../shared/validador-cpf';

declare var $: any;

@Component({
  selector: 'app-novo-titular',
  templateUrl: './novo-titular.component.html',
  styleUrls: ['./novo-titular.component.css'],
})
export class NovoTitularComponent implements OnInit {
  titular: Titular = new Titular();
  cpfValido = true;

  constructor(private toastr: ToastrService, private api: ApiService) {}

  ngOnInit(): void {
    
    $(document).ready(() => {
      $('.cep').mask('00000-000');
      $('.celular').mask('(00) 00000-0000');
      $('.cpf').mask('000.000.000-00', {
        reverse: false,
      });
    });

    // TELA DE ANEXO ESTADO CIVIL

    $('input, select, textarea').keypress(function (event: {
      which: number;
      preventDefault: () => void;
    }) {
      if (event.which == 13) {
        event.preventDefault();
      }
    });

    $('#estado_civil').on('change', function () {
      'Casado(a)' === $(this).val()
        ? $('#vinc-anexo-casado').fadeIn('100')
        : $('#vinc-anexo-casado').fadeOut('100');
      //
      'Selecione' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
      //
      'Solteiro' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
      //
      'Convivente' === $(this).val();
      $('#reanexar').fadeOut('100');
      $('#datacasamento').fadeOut('100');
    });

    $('#filhoConjuge').on('change', function () {
      'Filho(a)' === $(this).val()
        ? $('#vinc-anexo-conjugeFilho').fadeIn('100')
        : $('#vinc-anexo-conjugeFilho').fadeOut('100');
      //
      'Conjuge' === $(this).val();
      $('#reanexar2').fadeOut('100');
      //
      'Solteiro' === $(this).val();
      $('#reanexar2').fadeOut('100');
      //
    });

    $('#fecharAnexo').click(function () {
      $('#vinc-anexo-casado').fadeOut('100');
      $('#reanexar').fadeIn('100');
      $('#datacasamento').fadeIn('100');
    });

    $('#abrirAnexo').click(function () {
      $('#vinc-anexo-casado').fadeIn('100');
    });
    //

    // TELA DE VINCULO EMPREGATICIO
    $('#dataAdmissao').on('blur', function () {
      $('#vinc-anexo-empregaticio').fadeIn('100');
    });
    $('#dataAdmissao').on('focus', function () {
      $(this).siblings('#vinc-anexo-empregaticio').fadeIn('100');
    });
    $('#vinc-anexo-empregaticio').hide();
    //
    $('#fecharAnexoNovoTit').click(function () {
      $('#vinc-anexo-empregaticio').fadeOut('100');
      $('#reanexar4').fadeIn('100');
    });

    $('#abrirAnexo4').click(function () {
      $('#vinc-anexo-empregaticio').fadeIn('100');
    });
    //

    $('#fecharTelaTitular').click(function () {
      $('#confirmacaoTitular').fadeOut('100');
    });
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

  validarEmpresa() {
    $('#confirmarEmpresa').prop('disabled', true);
    this.api.listar(`empresa/?cod_empresa=${this.titular.cod_empresa}`).subscribe(
      (data) => {
        console.log(data);
        if (data.length > 0) {
          $('#confirmarEmpresa').prop('disabled', false);
        }
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }          
    );
  }
  
  newTitular() {
    this.titular.ativo = true;
    this.api.inserirComArquivo('titular/', this.titular).subscribe(
      (data) => {
        $('#confirmacaoTitular').fadeIn('100');
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  vinculoEmpInput(files: FileList) {
    this.titular.anexo_doc_empregaticio = files.item(0);
  }

  anexoCasamentoInput(files: FileList) {
    this.titular.anexo_doc_casamento = files.item(0);
  }
}
