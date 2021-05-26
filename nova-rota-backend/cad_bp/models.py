from django.db import models
from localflavor.br.models import BRCPFField, BRStateField, BRPostalCodeField
from cad_at.models import Titular


class Parentesco (models.Model):
    objects: None = None
    sexo_choice = (
        ('Masculino', 'Masculino'),
        ('Feminino', 'Feminino'),
    )

    estado_civil_choice = (
        ('Solteiro(a)', 'Solteiro(a)'),
        ('Casado(a)', 'Casado(a)'),
        ('Convivente', 'Convivente'),
    )
    CPF = BRCPFField("Número CPF", max_length=14, null=False, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, null=False)
    tipo = models.CharField("Tipo Cadastro", max_length=25,
                            default="Inclusão de Parentesco", editable=False)
    nome_dependente = models.CharField("Nome Dependente", max_length=255, blank=False)
    data_nascimento = models.DateField(
        "Data Nascimento", auto_now_add=False, auto_now=False, blank=False, null=False)
    data_casamento = models.DateField(
        "Data Casamento", auto_now_add=False, auto_now=False, blank=True)
    sexo = models.CharField(max_length=25, choices=sexo_choice,
                            blank=True, default="Selecione", null=False)
    estado_civil = models.CharField(
        max_length=25, choices=estado_civil_choice, default="Selecione", null=False, blank=False)
    anexo_doc_parentesco = models.ImageField(upload_to='anexo_parentescos', blank=True, null=True)
    nome_mae = models.CharField("Nome da Mae", max_length=255)
    data_admissao = models.DateField(
        "Data de Admissão", auto_now=False, auto_now_add=False, null=False)
    data_casamento = models.DateField(
        "Data Casamento", auto_now_add=False, auto_now=False, blank=True, null=False)
    tipo_parentesco = models.CharField(
        "Tipo Parentesco", max_length=25, default="Parentesco", editable=False)
    titular = models.ForeignKey(Titular, on_delete=models.CASCADE, blank=False)
    CEP = BRPostalCodeField("Código Postal", max_length=14, null=False)
    celular = models.CharField("Numero do Celular", max_length=100, null=True)
    cidade = models.CharField("Cidade", max_length=150, blank=False, null=False)
    estado = BRStateField("Estado UF", max_length=150, blank=False, null=False)
    declaracao_saude = models.CharField("Declaracao Saude", max_length=255, blank=False)
    status = models.CharField("Status", max_length=25,
                              default="OK", editable=False)
    desc_declarao_saude = models.CharField(
        "Desc. Declaracao Saude", max_length=255)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado", auto_now=True)


    def __str__(self):
        return f'{self.nome_dependente} - CPF: {self.CPF}'
