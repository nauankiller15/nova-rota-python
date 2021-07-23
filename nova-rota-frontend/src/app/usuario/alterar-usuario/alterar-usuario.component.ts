import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Cargo, Usuario } from '../models';

declare var $: any;

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent implements OnInit {
  contentLoaded = false;
  p = 1;

  busca: Usuario[]  = []
  usuarios: Usuario[] = []; 
  usuario: Usuario = new Usuario;
  cargo: Cargo = new Cargo;

  constructor(private apiService: ApiService, private toastr: ToastrService) { 
    this.loadUsuarios() 
  }

  ngOnInit(): void {
  }

  loadUsuarios() {
    this.apiService.listar('usuario/').subscribe(
      (data) => {
        this.usuarios = data;
        this.busca = data;
        this.contentLoaded = true;
      },
      (error) => {
        const mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );
  }

  buscarUsuario(nome: string) {

  }

  usuarioClicked(usuario: Usuario) {
    $('#consulta').hide();
    $('#titularesappear').show();
    
    this.usuario = usuario;
    this.loadCargo();
  }

  loadCargo() {
    this.apiService.listar('cargo/?user=' + this.usuario.id).subscribe(
      (data) => {
        if (data.length > 0) {
          this.cargo = data[0];
        } else {
          this.cargo = new Cargo;
        }
      },
      (error) => {
        const mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );  
  }

  atualizarUsuario() {
    this.apiService.atualizar('manipular-usuario/', this.usuario).subscribe(
      (data) => {
        this.toastr.success('Usuário atualizado com sucesso');
      },
      (error) => {
        const mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );  
  }

  clickAtualizarCargo() {
    if (this.cargo.id == null) {
      this.cargo.user = this.usuario.id;
      this.inserirCargo();
    } else {
      this.atualizarCargo();
    }

  }

  atualizarCargo() {
    this.apiService.atualizar('cargo/', this.cargo).subscribe(
      (data) => {
        this.toastr.success('Cargo atualizado com sucesso');
      },
      (error) => {
        const mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );  
  }

  inserirCargo() {
    this.apiService.inserir('cargo/', this.cargo).subscribe(
      (data) => {
        this.toastr.success('Cargo atualizado com sucesso');
      },
      (error) => {
        const mensagens = error.error;
        for (let campo in mensagens) {
          this.toastr.error(mensagens[campo], 'Erro no ' + campo);
        }
      }
    );  
  }
}

