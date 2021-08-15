export class Titular {
    nome: string;
    id: number;
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
    nome_mae: string;
    data_admissao: string;
    CEP: string;
    celular: string;
    cidade: string;
    estado: string;
    declaracao_saude: string;
    desc_declarao_saude: string;
    observacoes: string;
    ativo: boolean;
    criado_em: string;
    anexo_doc_casamento: File = null;
    anexo_doc_empregaticio: File = null;
}

export class CancelarCadastro {
    id: number;
    nome: string;
    ativo: boolean = false;
}
