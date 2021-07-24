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
  // CARREGADOR
  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;

  p = 1;

  busca: Usuario[]  = []
  usuarios: Usuario[] = []; 
  usuario: Usuario = new Usuario;
  cargo: Cargo = new Cargo;

  constructor(private apiService: ApiService, private toastr: ToastrService) { 
    this.loadUsuarios() 
  }

  ngOnInit(): void {
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
      //---------------

    // VOLTAR ALTERAÇÃO DE DADOS
    $('#voltarUser').click(function () {
      $('#userappear').fadeOut('200');
      $('#consultaUser').slideDown('200');
      $('#postTit').slideUp(600);
    });

    $('#abrirAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeIn('100');
    });

    $('#fecharAnexoAlt').click(function () {
      $('#vinc-anexo-casadoAlt').fadeOut('100');
    });

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

  buscarUsuario(first_name: string) {
 if (first_name != '') {
      this.busca = this.usuarios.filter((res) => {
        return res.first_name.match(first_name);
      });
    } else if (first_name == '') {
      this.busca = this.usuarios;
    }
  }

  usuarioClicked(usuario: Usuario) {
    $('#consultaUser').slideUp(250);
    $('#userappear').slideDown(250);
    $('#postUser').slideDown(600);
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

