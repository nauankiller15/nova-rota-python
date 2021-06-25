import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-alteracao-titular',
  templateUrl: './alteracao-titular.component.html',
  styleUrls: ['./alteracao-titular.component.css'],
})
export class AlteracaoTitularComponent implements OnInit {
  selected_titular = {
    id: 0,
    CPF: '000.000.000-00',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_benef: '',
    data_nascimento: '',
    carteirinha: '',
    sexo: '',
    estado_civil: '',
    anexo_doc_tit: '',
    nome_mae: '',
    data_admissao: '',
    data_casamento: '',
    anexo_doc_casamento: null,
    anexo_doc_empregaticio: null,
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

  fileToUpload: File = null;
  CPF: string;
  nome_benef: string;
  p: number = 1;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.getTitulares();
  }

  ngOnInit(): void {
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
    $('#voltardados').click(function () {
      $('#titularesappear').fadeOut('200');
      $('#consulta').slideDown('200');
    });

    $('#abrirAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });
  }

  searchCPF() {
    if (this.CPF != '') {
      this.titulares = this.titulares.filter((res) => {
        return res.CPF.toLocaleLowerCase().match(this.CPF.toLocaleLowerCase());
      });
    } else if (this.CPF == '') {
      this.getTitulares();
    }
  }

  searchNomeBenef() {
    if (this.nome_benef != '') {
      this.titulares = this.titulares.filter((res) => {
        return res.nome_benef
          .toLocaleLowerCase()
          .match(this.nome_benef.toLocaleLowerCase());
      });
    } else if (this.nome_benef == '') {
      this.getTitulares();
    }
  }

  getTitulares = () => {
    this.api.conectar('titular/').subscribe(
      (data) => {
        this.titulares = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadTitular(id: string) {
    this.api.conectar('titular/', null, id).subscribe(
      (data) => {
        this.selected_titular = data;
      },
      (error) => {
        this.toastr.error('Titular não encontrado', error.message);
      }
    );
  }

  titularClicked = (titular: { id: string }) => {
    $('#consulta').fadeOut('200');
    $('#titularesappear').fadeIn('200');
    this.api.conectar('titular/', null, titular.id).subscribe(
      (data) => {
        this.selected_titular = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateTit() {
    this.api.atualizar('titular/', this.selected_titular).subscribe(
      (data) => {
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
