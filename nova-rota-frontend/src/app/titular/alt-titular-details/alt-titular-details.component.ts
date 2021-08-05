import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Titular } from '../models';

declare var $: any;

@Component({
  selector: 'app-alt-titular-details',
  templateUrl: './alt-titular-details.component.html',
  styleUrls: ['./alt-titular-details.component.css'],
})
export class AltTitularDetailsComponent implements OnInit {

  selected_titular: Titular = new Titular;
  
  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.loadTitular();
  }

  ngOnInit(): void {}

  loadTitular() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.selecionar('titular/', id).subscribe(
      (data) => {
        this.selected_titular = data;
      },
      (error) => {
        this.toastr.error('Titular não encontrado', error.message);
      }
    );
  }
}
