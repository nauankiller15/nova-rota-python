import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Cargo, NovoUsuario } from '../models';

declare var $: any;
@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  usuario: NovoUsuario = new NovoUsuario;
  cargo: Cargo = new Cargo;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    $('.apagarEmp').click(function () {
      $('form').each(function () {
        this.reset();
      });
    });
  }

  novoUsuario(){
    console.log(this.usuario)
    console.log(this.cargo)
    this.apiService.inserir('usuario/', this.usuario).subscribe(
      (data) => {
        console.log(data)
        this.usuario = data
        this.cargo.user = data.id
        this.apiService.inserir('cargo/', this.cargo).subscribe(
          (data) => {
            console.log(data)
            this.toastr.success('Usuario inserido com sucesso');
          },
          (error) => {
            let mensagens = error.error;
            for (let campo in mensagens) {
              this.toastr.error(mensagens[campo], 'Erro no ' + campo);
            }
          }
        );
      },
      (error) => {
        let mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

}
