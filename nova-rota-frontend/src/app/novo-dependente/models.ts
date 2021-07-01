export class Dependente {

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
    CEP: string;
    celular: string;
    cidade: string;
    estado: string;
    declaracao_saude: string;
    desc_declarao_saude: string;
    observacoes: string;
    nome_benef: string;
}

export class Titular {
    id: number;
    CPF: string;
    nome_benef: string;
}