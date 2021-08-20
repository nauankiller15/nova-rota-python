import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Titular, TransferirTitular } from '../models';

declare var $: any;

@Component({
  selector: 'app-transferencia-titular',
  templateUrl: './transferencia-titular.component.html',
  styleUrls: ['./transferencia-titular.component.css'],
})
export class TransferenciaTitularComponent implements OnInit {
  busca: Titular[] = [];
  titulares: Titular[] = [];
  cadastro: TransferirTitular = new TransferirTitular();

  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;
  p: number = 1;
  //

  constructor(private toastr: ToastrService, private api: ApiService) {
    this.getTitulares();
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
  }

  searchCPF(CPF: string) {
    if (CPF != '') {
      this.busca = this.titulares.filter((res) => {
        return res.CPF.match(CPF);
      });
    } else {
      this.busca = this.titulares;
    }
  }

  searchNomeBenef(nome: string) {
    if (nome != '') {
      this.busca = this.titulares.filter((res) => {
        return res.nome.match(nome);
      });
    } else {
      this.busca = this.titulares;
    }
  }

  getTitulares = () => {
    this.api.listar('titular/?ativo=true').subscribe(
      (data) => {
        this.titulares = data;
        this.busca = data;
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  };

  titularClicked(titular: Titular) {
    this.cadastro.id = titular.id;
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
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  voltarCarteirinha() {
    $('#digitarCarteirinha').fadeOut(250);
  }

  transferirCadastro() {
    this.api.atualizarCampo('titular/', this.cadastro).subscribe(
      (data) => {
        this.getTitulares();
        this.toastr.success('Titular transferido com sucesso');
        $('#digitarCodigo').fadeOut(250);
        $('#digitarCarteirinha').fadeOut(250);
      },
      (error) => {
        const mensagens = error.error;
        for (let mensagem in mensagens) {
          this.toastr.error(mensagem, mensagens[mensagem]);
        }
      }
    );
  }
}
