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
    anexo_doc_parentesco: File;
    anexo_doc_casamento: File;
    anexo_doc_nascimento: File;
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
    titular_nome: string;
}

export class Titular {
    id: number;
    CPF: string;
    nome: string;
}