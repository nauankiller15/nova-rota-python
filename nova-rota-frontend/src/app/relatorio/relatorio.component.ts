import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { dados } from './dados';

declare var $: any;

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  vigencias = [];
  dadosRelatorio = dados;

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    const hoje = new Date;  
    const periodo = hoje.getDate() < 15 ? 1 : 2;
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    this.selecionarVigencia(`${periodo}-${mes}-${ano}`);
  }

  ngOnInit(): void {
  }

  getDataSelecao(selecao: string): Date {
    // selecao no formato: periodo(int)-mes(int)-ano(int) # janeiro é 0, fevereiro 1, etc...
    let data = new Date();
    const vigencia = selecao.split('-');
    const periodo = vigencia[0];
    const dia = periodo == '1' ? 1 : 15
    const mes = parseInt(vigencia[1]); // lembrar que os meses começam com indice 0
    const ano = parseInt(vigencia[2]);
  
    data.setDate(dia);
    data.setMonth(mes);
    data.setFullYear(ano);

    return data
  }

  setVigencias(vigencia:string): Array<any> {
    
    let vigencias = [];
    const dataSelecionada = this.getDataSelecao(vigencia)
    console.log('selecionado', dataSelecionada);

    let data = new Date(dataSelecionada);
    console.log(dataSelecionada.getDate());
    const inicio = dataSelecionada.getDate() == 1 ? 1 : 0
    data.setDate(data.getDate() - 45);

    for (let i = inicio; i < 7 + inicio; i++) {
      vigencias.push(this.setVigencia(i % 2 + 1, data.getMonth(), data.getFullYear()));
      if (i % 2 == 1) {
        data.setMonth(data.getMonth() + 1);
      }
    }

    return vigencias
  }

  setVigencia(periodo: number, mes: number, ano: number): Array<any> {

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
     'Outubro', 'Novembro', 'Dezembro'];
    const label = `${periodo}ª ${meses[mes]}/${ano.toString().substring(2,4)}`;
    const idVigencia = `${periodo}-${mes}-${ano}`;
    
    return [label, idVigencia]
  }
  
  selecionarVigencia(id_vigencia: string){

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
          const mensagens = error.error;
          for (let mensagem in mensagens) {
            this.toastr.error(mensagem, mensagens[mensagem]);
          }
        }
      );
    }
  }
}
