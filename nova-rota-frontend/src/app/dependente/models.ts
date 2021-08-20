export class Dependente {
  id: number;
  nome: string;
  CPF: string;
  cod_empresa: string;
  carteirinha: string;
  prioridade: string;
  data_recebimento: string;
  tipo: string;
  data_nascimento: string;
  data_casamento: string;
  sexo: string;
  estado_civil: string;
  tipo_parentesco: string;
  nome_mae: string;
  data_admissao: string;
  titular: number;
  CEP: string;
  celular: string;
  cidade: string;
  estado: string;
  declaracao_saude: string;
  desc_declarao_saude: string;
  observacoes: string;
  status: string;
  ativo: boolean;
  criado_em: string;
  transferido: boolean;
  titular_nome: string;
  anexo_doc_parentesco: File = null;
  anexo_doc_casamento: File = null;
  anexo_doc_nascimento: File = null;
}

export class Titular {
  id: number;
  CPF: string;
  nome: string;
}

export class CancelarCadastro {
  id: number;
  nome: string;
}

export class TransferirDependente {
  id: number;
  carteirinha: string;
  cod_empresa: string;
  transferido = true;
}