from django.db import models
from localflavor.br.models import BRStateField, BRCNPJField


class Empresa (models.Model):

    contrato_choice = (
        ('Masculino', 'Masculino'),
        ('Feminino', 'Feminino'),
    )

    CNPJ = BRCNPJField("Número CNPJ", max_length=14, null=False, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False, unique=True)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    tipo_contrato = models.CharField(max_length=25, choices=contrato_choice,
                            blank=True, null=False)
    razao_social = models.CharField("Razão Social", max_length=255)
    anexo_doc_emp = models.ImageField(upload_to='anexo_empresa', blank=True, null=True)
    vencimento_boleto = models.DateField(
        "Vencimento do Boleto", auto_now=False, auto_now_add=False, null=False)
    inicio_vigencia = models.DateField(
        "Inicio de Vigência", auto_now=False, auto_now_add=False, null=False)
    estado = BRStateField("Estado UF", max_length=150, blank=False, null=False)
    declaracao_saude = models.CharField("Declaracao Saude", max_length=255)
    status = models.CharField("Status", max_length=25,
                              default="OK", editable=False)
    cod_apolice = models.CharField(
        "Código ou Apólice", max_length=255)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado", auto_now=True)

    def __str__(self):
        return f'{self.razao_social} - CNPJ: {self.CNPJ}'


class Filial(Empresa):
    sede = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='principal')

class Reajuste(models.Model):
    ano = models.PositiveIntegerField()
    empresa = models.ForeignKey(Empresa,  on_delete=models.CASCADE)

class Sinistro(models.Model):
    ano = models.PositiveIntegerField()
    empresa = models.ForeignKey(Empresa,  on_delete=models.CASCADE)
