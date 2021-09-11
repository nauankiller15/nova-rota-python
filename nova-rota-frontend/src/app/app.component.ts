import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Tarefa } from './home/models';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<menu></menu><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  tarefas: Tarefa[] = [];
  
  title = 'nova-rota-frontend';

  ngOnInit() { }

  constructor(
    private api: ApiService,
    private toastrService: ToastrService,
  ) { }
}
