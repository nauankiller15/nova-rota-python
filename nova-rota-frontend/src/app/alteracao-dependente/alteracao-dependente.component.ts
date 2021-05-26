import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-alteracao-dependente',
  templateUrl: './alteracao-dependente.component.html',
  styleUrls: ['./alteracao-dependente.component.css'],
})
export class AlteracaoDependenteComponent implements OnInit {
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // textOnly(event): boolean {
  //   var key = event.keyCode;
  //   `enter code here`;
  //   return (key >= 65 && key <= 90) || key == 8;
  // }

  titulares = [
    {
      id: 0,
      CPF: '',
      nome_dependente: '',
    },
  ];

  selected_dependente = {
    id: 0,
    CPF: '',
    cod_empresa: '',
    data_recebimento: '',
    tipo: '',
    nome_dependente: '',
    data_nascimento: '',
    sexo: '',
    estado_civil: '',
    anexo_doc_tit: '',
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
    titular: '',
  };

  dependentes = [
    {
      id: 0,
      CPF: '',
      nome_dependente: '',
    },
  ];
  p: number = 1;
  fileToUpload: File = null;
  CPF: string;
  nome_dependente: string;
  nome_benef: string;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.getDependentes();
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
    $('#voltardadosdep').click(function () {
      $('#dependentes').fadeOut('200');
      $('#consulta2').slideDown('200');
    });
  }

  searchCPF() {
    if (this.CPF != '') {
      this.dependentes = this.dependentes.filter((res) => {
        return res.CPF.toLocaleLowerCase().match(this.CPF.toLocaleLowerCase());
      });
    } else if (this.CPF == '') {
      this.getDependentes();
    }
  }

  searchNomeBenef() {
    if (this.nome_dependente != '') {
      this.dependentes = this.dependentes.filter((res) => {
        return res.nome_dependente
          .toLocaleLowerCase()
          .match(this.nome_dependente.toLocaleLowerCase());
      });
    } else if (this.nome_dependente == '') {
      this.getDependentes();
    }
  }

  getDependentes = () => {
    this.api.getAlldependentes().subscribe(
      (data) => {
        this.dependentes = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  getTitulares = () => {
    this.api.getAlltitulares().subscribe(
      (data) => {
        this.titulares = data;
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  loadDependente(id: string) {
    this.api.getDependente(id).subscribe(
      (data) => {
        this.selected_dependente = data;
      },
      (error) => {
        this.toastr.error('Dependente não encontrado', error.message);
      }
    );
  }

  dependenteClicked = (dependentes: { id: string }) => {
    $('#consulta2').fadeOut('200');
    $('#dependentes').fadeIn('20');
    this.api.getDependente(dependentes.id).subscribe(
      (data) => {
        this.selected_dependente = data;
        console.log(data);
      },
      (error) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  };

  updateDependente() {
    this.api.updateDependente(this.selected_dependente).subscribe(
      (data: {
        id: number;
        CPF: string;
        cod_empresa: string;
        data_recebimento: string;
        tipo: string;
        nome_dependente: string;
        data_nascimento: string;
        sexo: string;
        estado_civil: string;
        anexo_doc_tit: string;
        nome_mae: string;
        data_admissao: string;
        data_casamento: string;
        tipo_parentesco: string;
        CEP: string;
        celular: string;
        cidade: string;
        estado: string;
        declaracao_saude: string;
        status: string;
        desc_declarao_saude: string;
        observacoes: string;
        titular: string;
      }) => {
        this.selected_dependente = data;
        this.toastr.success('Atualizado com sucesso!');
      },
      (error: { message: string }) => {
        this.toastr.error('Aconteceu um Erro!', error.message);
      }
    );
  }
}
