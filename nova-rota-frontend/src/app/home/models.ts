export class Tarefa {
  id: number;
  usuario: number;
  titulo: string;
  descricao: string;
  criado_em: string;
  status_tarefa: boolean = false;
}

export class Novidade {
  id: number;
  titulo: string;
  descricao: string;
}
