import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ApiService } from './api.service';

declare var $: any;

@Component({
  selector: 'app-novo-titular',
  templateUrl: './novo-titular.component.html',
  styleUrls: ['./novo-titular.component.css'],
})
export class NovoTitularComponent implements OnInit {
  titular = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_benef: '',
    data_nascimento: '',
    sexo: '',
    estado_civil: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: '',
    tipo_parentesco: '',
    CEP: '',
    celular: '',
    cidade: '',
    estado: '',
    declaracao_saude: '',
    status: '',
    desc_declarao_saude: '',
    observacoes: '',
  };

  titulares = [
    {
      id: 0,
      CPF: '',
      nome_benef: '',
    },
  ];

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    $(document).ready(() => {
      $('.date').mask('00/00/0000');
      $('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      $('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 00000-0000');
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
  }

  newTitular() {
    this.api.saveNewTitular(this.titular).subscribe(
      (data) => {
        this.toastr.success('Titular inserido com sucesso!');
        this.appComponent.titular.push(data);
      },
      (error: { message: string }) => {
        this.toastr.error('Dados necessários em branco!', error.message);
      }
    );
  }
}
