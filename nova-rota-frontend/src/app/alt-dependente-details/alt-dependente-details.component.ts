import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-alt-dependente-details',
  templateUrl: './alt-dependente-details.component.html',
  styleUrls: ['./alt-dependente-details.component.css'],
})
export class AltDependenteDetailsComponent implements OnInit {
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
    carteirinha: '',
  };

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.loadDependente();
  }

  ngOnInit(): void {}

  loadDependente() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.conectar('parentesco/', id).subscribe(
      (data) => {
        this.selected_dependente = data;
      },
      (error) => {
        this.toastr.error('Dependente não encontrado', error.message);
      }
    );
  }
}
