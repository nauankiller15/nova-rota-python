export class Empresa {
    id: number;
    CNPJ: string;
    cod_empresa: string;
    razao_social: string;
    status: string = 'OK';
    vencimento_boleto: string;
    tipo_contrato: string = 'Selecione aqui';
    inicio_vigencia: string;
    data_recebimento: string;
    anexo_doc_emp: string;
    celular: string;
    cidade: string;
    estado: string;
    observacoes: string;
    is_filial: boolean = false;
    // campos de filial
    CNPJ_empresa_principal: string;
    razao_social_principal: string;
}


export class ContratoOperadora {
    id: number;
    empresa: number;
    tipo: string;
    nome: string;
    codigo: string;
}

export class ContratoSeguradora {
    id: number;
    empresa: number;
    nome: string;
    tipo: string = 'Seguro de Vida';
    apolice: string;
}

export class Reajuste{
    id: number;
    empresa: number;
    ano_vigencia: number;
    fidelizado: number;
    tecnico: number;
    negociado: number;
}

export class Sinistralidade {
    id: number;
    empresa: number;
    ano: number;
    sinistralidade: string;
}
