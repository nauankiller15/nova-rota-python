import { ToastrService } from 'ngx-toastr';


export class Erro {
  erro: any;

  constructor(private toastrService: ToastrService, erro: any){
    this.erro = erro
  }

  exibir() {
    let msg: string[] = [];
    if (this.erro.status == 400) {
      const mensagem = this.erro.error;
      for (let campo in mensagem) {
       this.toastrService.error(mensagem[campo], campo);
      };
      return;
    } else if (this.erro.status == 500) {
      msg = ['Erro interno do sistema', 'Erro'];
    } else {
      msg = ['Erro desconhecido', 'Erro'];
    }
    this.toastrService.error(msg[0], msg[1])
  }
}