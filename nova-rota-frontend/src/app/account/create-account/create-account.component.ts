import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'criar-conta',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    $('#criar-conta').on('click', function () {
      $('#criar-conta').fadeOut('100');
      $('.box-criar-conta').slideUp('100');
    });
  }

}
