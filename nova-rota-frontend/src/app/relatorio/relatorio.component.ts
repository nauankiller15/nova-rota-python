import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  vigencias = [
    ['1ª julho/21', '1-07-21'], 
    ['2ª Julho/21', '2-07-21'], 
    ['1ª Agosto/21', '1-08-21'], 
    ['2ª Agosto/21', '2-08-21'], 
    ['',''], ['',''], ['', '']
  ]

  constructor() { }

  ngOnInit(): void {
  }
  
  selecionarVigencia(id_vigencia: string){
    console.log(id_vigencia);
    $(`#${id_vigencia}`).addClass('active');
    $(`#${id_vigencia}`).siblings().removeClass('active');
  }
}
