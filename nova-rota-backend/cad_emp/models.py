from django.db import models
from django.db.models.base import Model
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

    CNPJ = BRCNPJField("Número CNPJ", max_length=14, null=False, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False, unique=True)
    vencimento_boleto = models.DateField(
        "Vencimento do Boleto", auto_now=False, auto_now_add=False, null=False)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    razao_social = models.CharField("Razão Social", max_length=255)
    tipo_contrato = models.CharField(max_length=25, choices=contrato_choice)
    anexo_doc_emp = models.ImageField(upload_to='anexo_empresa', blank=True, null=True)
    inicio_vigencia = models.DateField(
        "Inicio de Vigência", auto_now=False, auto_now_add=False, null=False)
    celular = models.CharField("Numero do Celular", max_length=100, null=True)
    cidade = models.CharField("Cidade", max_length=150, blank=False, null=False)
    estado = BRStateField("Estado UF", max_length=150, blank=False, null=False)
    is_filial = models.BooleanField()
    status = models.CharField("Status", max_length=25,
                              default="OK", editable=False)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado", auto_now=True)

    def __str__(self):
        return f'{self.razao_social} - CNPJ: {self.CNPJ}'

class Filial(Empresa):
    CNPJ_empresa_principal = BRCNPJField(max_length=14)
    razao_social_principal = models.CharField(max_length=255)


class Reajuste(models.Model):

    fidelizado_choice = (
        ('Não', 'Não'),
        ('Sim', 'Sim'),
    )
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    ano_vigencia = models.PositiveIntegerField(blank=False, null=False)
    fidelizado = models.CharField(max_length=25, choices=fidelizado_choice,
                                  blank=False, default="Selecione", null=False)
    tecnico = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=False)
    negociado = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=False)


class Sinistralidade(models.Model):

    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    ano = models.PositiveIntegerField(blank=False, null=False)
    sinistralidade = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=False)


class ContratoOperadora(models.Model):
    
    operadora_choice = (
        ('Saude', 'Saude'),
        ('Odonto', 'Odonto'),
    )
    
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    nome = models.CharField("Nome da Seguradora", max_length=255, blank=False, null=False)
    tipo = models.CharField(max_length=25, choices=operadora_choice,
                                     blank=False, default="Selecione", null=False)
    codigo = models.CharField("Codigo", max_length=100, blank=False, null=False)

    def save(self, *args, **kwargs):
        contratos_seguradora = ContratoSeguradora.objects.filter(empresa_id=self.empresa)
        if len(contratos_seguradora) > 0:
            for contrato in contratos_seguradora:
                contrato.delete()
        return super().save(*args, **kwargs)


class ContratoSeguradora(models.Model):

    seguradora_choice = (
        ('Seguro de Vida', 'Seguro de Vida'),
    )

    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    nome = models.CharField("Nome da Seguradora", max_length=255, blank=False, null=False)
    tipo = models.CharField(max_length=25, choices=seguradora_choice,
                                     blank=False, default="Selecione", null=False)
    apolice = models.CharField("Apolice", max_length=100, blank=False, null=False)

    def save(self, *args, **kwargs):
        contratos_operadora = ContratoOperadora.objects.filter(empresa_id=self.empresa)
        if len(contratos_operadora) > 0:
            for contrato in contratos_operadora:
                contrato.delete()
        return super().save(*args, **kwargs)
