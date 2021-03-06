import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/shared/erros';
import { ApiService } from '../../api.service';
import { Dependente, TransferirDependente } from '../models';

declare var $: any;

@Component({
  selector: 'app-transferencia-dependente',
  templateUrl: './transferencia-dependente.component.html',
  styleUrls: ['./transferencia-dependente.component.css']
})
export class TransferenciaDependenteComponent implements OnInit {
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  // DADOS DO DEPENDENTE
  busca: Dependente[] = [];
  dependentes: Dependente[] = [];
  cadastro: TransferirDependente = new TransferirDependente;
  //
  intervalId: number | null = null;
  //

  p: number = 1;

  constructor(private toastrService: ToastrService, private api: ApiService) {
    this.getDependentesAtivos();
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
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else if (CPF == '') {
      this.busca = this.dependentes;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.dependentes.filter((res) => {
        return res.nome.match(nome);
      });
    } else if (nome == '') {
      this.busca = this.dependentes;
    }
  }

  getDependentesAtivos() {
    this.api.listar('parentesco/?ativo=true').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  getDependentesInativos() {
    this.api.listar('parentesco/?ativo=false').subscribe(
      (data) => {
        this.dependentes = data;
        this.busca = data;
      },
      (error) => {
        this.toastrService.error('Aconteceu um Erro!', error.message);
      }
    );
  }

  dependenteClicked(dependente: Dependente) {
    this.cadastro.id = dependente.id;
    this.cadastro.transferido = true;
    $('#digitarCodigo').fadeIn(250);
  }

  empresaVoltar() {
    $('#digitarCodigo').fadeOut(250);
  }

  confirmaEmpresa() {
    $('#erroEmpresa').fadeOut(100);
    this.api.listar(`empresa/?cod_empresa=${this.cadastro.cod_empresa}`).subscribe(
      (data) => {
        if (data.length > 0) {
          $('#digitarCodigo').fadeOut(250);
          $('#digitarCarteirinha').fadeIn(250);
        } else {
          $('#erroEmpresa').fadeIn(100);
        }
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir();
      }
    );
  }

  voltarCarteirinha() {
    $('#digitarCarteirinha').fadeOut(250);
  }

  transferirCadastro() {
    this.api.atualizarCampo('parentesco/', this.cadastro).subscribe(
      (data) => {
        this.getDependentesAtivos()
        this.toastrService.success("Dependente transferido com sucesso");
        $('#digitarCodigo').fadeOut(250);
        $('#digitarCarteirinha').fadeOut(250);
      },
      (error) => {
        const erro = new Erro(this.toastrService, error);
        erro.exibir(); 
      }
    );

  }
}
