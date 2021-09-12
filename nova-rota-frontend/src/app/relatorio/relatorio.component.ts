import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Erro } from '../shared/erros';

var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

declare var require: any
declare var $: any;

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  p: number = 1;

  vigencias = [];
  dadosRelatorio = [];

  @ViewChild('tabelaRelatorio') pdfTable: ElementRef;


  constructor(private apiService: ApiService, private toastrService: ToastrService) {
    const hoje = new Date();
    const periodo = hoje.getDate() < 15 ? 1 : 2;
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    this.selecionarVigencia(`${periodo}-${mes}-${ano}`);
  }

  ngOnInit(): void {}

  getDataSelecao(selecao: string): Date {
    // selecao no formato: periodo(int)-mes(int)-ano(int) # janeiro é 0, fevereiro 1, etc...
    let data = new Date();
    const vigencia = selecao.split('-');
    const periodo = vigencia[0];
    const dia = periodo == '1' ? 1 : 15;
    const mes = parseInt(vigencia[1]); // lembrar que os meses começam com indice 0
    const ano = parseInt(vigencia[2]);

    data.setDate(dia);
    data.setMonth(mes);
    data.setFullYear(ano);

    return data;
  }

  setVigencias(vigencia: string): Array<any> {
    let vigencias = [];
    const dataSelecionada = this.getDataSelecao(vigencia);

    let data = new Date(dataSelecionada);
    const inicio = dataSelecionada.getDate() == 1 ? 1 : 0;
    data.setDate(data.getDate() - 45);

    for (let i = inicio; i < 7 + inicio; i++) {
      vigencias.push(
        this.setVigencia((i % 2) + 1, data.getMonth(), data.getFullYear())
      );
      if (i % 2 == 1) {
        data.setMonth(data.getMonth() + 1);
      }
    }

    return vigencias;
  }

  setVigencia(periodo: number, mes: number, ano: number): Array<any> {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const label = `${periodo}ª ${meses[mes]}/${ano.toString().substring(2, 4)}`;
    const idVigencia = `${periodo}-${mes}-${ano}`;

    return [label, idVigencia];
  }

  selecionarVigencia(id_vigencia: string) {
    if (id_vigencia != '') {
      this.vigencias = this.setVigencias(id_vigencia);
      const data = this.getDataSelecao(id_vigencia);
      $(`#${id_vigencia}`).addClass('active');
      $(`#${id_vigencia}`).siblings().removeClass('active');
      this.apiService.listar(`relatorio/${id_vigencia}/`).subscribe(
        (data) => {
          this.dadosRelatorio = data;
        },
        (error) => {
          const erro = new Erro(this.toastrService, error);
          erro.exibir();
        }
      );
    }
  }

  
  public downloadAsPDF() {

    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const styles = {
      'capt': {
        'text-transform': 'capitalize'
      }, 

      'relatorio': {
        'background-color': '#fff'
      },
            
      'processado': {
        'background': '#d43f3f !important',
      },
      
      'transferencia': {
        'background-image': 'linear-gradient(to top, #d7c6ff 0%, #ebe9f0 100%)'
      },
      
      'alteracao': {
        'background-image': 'linear-gradient(to top, #a7e97f 0%, #f0f5ec 100%)',
        'color': '#424242'
      },

      'linhaS': {
        'border': '1px solid #ffffff85',
        'padding': '5px',
        'border-radius': '6px',
        'text-align': 'center',
        'font-weight': '700'
      },
      
      'tHeadl': {
        'font-size': '1.1em',
        'border-bottom': '3px solid #ccc'
      }
    }
    
    const documentDefinition = { pageSize: 'A4', pageOrientation: 'landscape', styles: styles, content: html };
    pdfMake.createPdf(documentDefinition).open();
     
  }
}


