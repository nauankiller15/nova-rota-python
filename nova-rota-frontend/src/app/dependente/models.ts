export class Dependente {
    id: number;
    CPF: string;
    cod_empresa: string;
    carteirinha: string;
    prioridade: string;
    data_recebimento: string;
    tipo: string;
    nome_dependente: string;
    data_nascimento: string;
    data_casamento: string;
    sexo: string;
    estado_civil: string;
    tipo_parentesco: string;
    anexo_doc_parentesco: string;
    anexo_doc_casamento: string;
    anexo_doc_nascimento: string;
    nome_mae: string;
    data_admissao: string;
    titular: number;
    nome_benef: string;
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
    nome_benef: string;
}