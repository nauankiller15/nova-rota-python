from django.db import models
from localflavor.br.models import BRStateField, BRCNPJField


class Empresa (models.Model):

    contrato_choice = (
        ('Operadora', 'Operadora'),
        ('Seguradora', 'Seguradora'),
    )
    operadora_choice = (
        ('Saude', 'Saude'),
        ('Odonto', 'Odonto'),
    )
    seguradora_choice = (
        ('Seguro de Vida', 'Seguro de Vida'),
    )

    CNPJ = BRCNPJField("Número CPF", max_length=14, null=False, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False, unique=True)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    tipo_contrato = models.CharField(max_length=25, choices=contrato_choice,
                            blank=False, default="Selecione", null=False)
    operadora = models.CharField(max_length=25, choices=operadora_choice,
                                     blank=False, default="Selecione", null=False)
    seguradora = models.CharField(max_length=25, choices=seguradora_choice,
                                     blank=False, default="Selecione", null=False)
    razao_social = models.CharField("Razão Social", max_length=255)
    anexo_doc_emp = models.ImageField(upload_to='anexo_empresa', blank=True, null=True)
    vencimento_boleto = models.DateField(
        "Vencimento do Boleto", auto_now=False, auto_now_add=False, null=False)
    inicio_vigencia = models.DateField(
        "Inicio de Vigência", auto_now=False, auto_now_add=False, null=False)
    estado = BRStateField("Estado UF", max_length=150, blank=False, null=False)
    historico_reajuste = models.CharField("Histórico de Reajuste", max_length=100, null=True)
    historico_sinistro = models.CharField("Histórico de Sinistralidade", max_length=100, null=True)
    declaracao_saude = models.CharField("Declaracao Saude", max_length=255)
    status = models.CharField("Status", max_length=25,
                              default="OK", editable=False)
    apolice = models.CharField("Codigo Empresa", max_length=100, null=False, unique=True)
    codigo = models.CharField("Codigo Empresa", max_length=100, null=False, unique=True)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado", auto_now=True)

    def __str__(self):
        return f'{self.razao_social} - CNPJ: {self.CNPJ}'
