import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/models';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() usuario: Usuario;

  constructor() {}

  ngOnInit(): void {
      $('.eraseForm').click(function () {
        $('#resetEmp').trigger('click');
        $('form').each(function () {
          this.reset();
        });
      });

     

  }

}
