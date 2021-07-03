export class Empresa {
    id: number;
    CNPJ: string;
    cod_empresa: string;
    razao_social: string;
    status: string = 'OK';
    vencimento_boleto: string;
    tipo_contrato: string;
    inicio_vigencia: string;
    data_recebimento: string;
    anexo_doc_emp: string;
    celular: string;
    cidade: string;
    estado: string;
    observacoes: string;
}

export class ContratoOperadora {
    empresa: number;
    tipo: string;
    nome: string;
    codigo: string;
}

export class ContratoSeguradora {
    empresa: number;
    nome: string;
    tipo: string = 'Seguro de Vida';
    apolice: string;
}

export class Reajuste{
    empresa: number;
    ano: number;
    sinistralidade: number;
    tecnico: number;
    negociado: number;
}

export class Sinistralidade {
    empresa: number;
    ano: number;
    tipo: string;
    sinistralidade: number;
    tecnico: number;
    negociado: number;
}
