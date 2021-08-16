export class Tarefa {
  id: number;
  usuario: number;
  titulo: string;
  descricao: string;
  status_tarefa: boolean = false;
  data_digitado: string;
}

export class Novidade {
  id: number;
  titulo: string;
  descricao: string;
}
