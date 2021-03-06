from datetime import timedelta

from django.db import models
from django.utils import timezone

from localflavor.br.models import BRCPFField, BRPostalCodeField, BRStateField

from validators.cod_empresa import cod_empresa_existe


def doc_empregaticio_path(instance, filename):
    extensao = filename.split('.')[-1]
    nome_arquivo = 'VINC.' + extensao
    return '/'.join(['titulares', instance.nome, nome_arquivo])

def doc_casamento_path(instance, filename):
    extensao = filename.split('.')[-1]
    nome_arquivo = 'CSMT.' + extensao
    return '/'.join(['titulares', instance.nome, nome_arquivo])

class Titular (models.Model):
    sexo_choice = (
        ('Masculino', 'Masculino'),
        ('Feminino', 'Feminino'),
    )

    estado_civil_choice = (
        ('Solteiro(a)', 'Solteiro(a)'),
        ('Casado(a)', 'Casado(a)'),
        ('Convivente', 'Convivente'),
    )

    declaracao_saude_choice = (
        ('Sim', 'Sim'),
        ('Nao', 'Nao'),
    )

    nome = models.CharField("Nome Beneficiario", max_length=255, blank=False)
    data_nascimento = models.DateField("Data Nascimento")
    CPF = BRCPFField("CPF", max_length=14, null=False, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False, blank=False, validators=[cod_empresa_existe])
    carteirinha = models.CharField("Numero da Carteirinha", max_length=35, null=True, blank=True)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    tipo = models.CharField("Tipo Cadastro", max_length=25,
                            default="Inclusão de Titular", editable=False)
    data_casamento = models.DateField(
        "Data Casamento", auto_now_add=False, auto_now=False, blank=True, null=True)
    sexo = models.CharField(max_length=25, choices=sexo_choice,
                            blank=False, default="Selecione", null=False)
    estado_civil = models.CharField(
        max_length=25, choices=estado_civil_choice, default="Selecione", null=False, blank=False)
    anexo_doc_casamento = models.ImageField(upload_to=doc_casamento_path, blank=True, null=True)
    anexo_doc_empregaticio = models.ImageField(upload_to=doc_empregaticio_path, blank=True, null=True)
    nome_mae = models.CharField("Nome da Mae", max_length=255, blank=False)
    data_admissao = models.DateField(
        "Data de Admissao", auto_now=False, auto_now_add=False, null=False)
    CEP = BRPostalCodeField("Código Postal", max_length=14,null=False)
    celular = models.CharField("Numero do Celular", max_length=100, null=True)
    cidade = models.CharField("Cidade", max_length=150, blank=False, null=False)
    estado = BRStateField("Estado UF", max_length=150, blank=False, null=False)
    declaracao_saude = models.CharField(max_length=25, choices=declaracao_saude_choice,
                            blank=False, default="Selecione", null=False)
    desc_declarao_saude = models.CharField(
        "Desc. Declaracao Saude", max_length=255, blank=True)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    ativo = models.BooleanField(default=True)
    transferido = models.BooleanField(default=False)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado em", auto_now=True)

    def prioridade(self):
        if self.ativo:
            if self.criado_em > timezone.now() - timedelta(days=30):
                return 'prioridade'
        return 'sem prioridade'

    def __str__(self):
        return f'{self.nome} - CPF: {self.CPF}'

    class Meta:
        ordering = ['ativo']