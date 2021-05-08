from django.db import models

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
    CPF = models.CharField("CPF", max_length=11, null=False)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    tipo = models.CharField("Tipo Cadastro", max_length=25,
                            default="Inclusão de Titular", editable=False)
    nome_benef = models.CharField("Nome Beneficiario", max_length=255)
    data_nascimento = models.DateField(
        "Data Nascimento", auto_now_add=False, auto_now=False, blank=True, null=False)
    sexo = models.CharField(max_length=25, choices=sexo_choice,
                            blank=True, default="Selecione", null=False)
    estado_civil = models.CharField(
        max_length=25, choices=estado_civil_choice, default="Selecione", null=False)
    nome_mae = models.CharField("Nome da Mae", max_length=255)
    data_admissao = models.DateField(
        "Data Admissiao", auto_now=False, auto_now_add=False, null=False)
    tipo_parentesco = models.CharField(
        "Tipo Parentesco", max_length=25, default="Sem Parentesco", editable=False)
    celular = models.CharField("Numero do Celular", max_length=100, null=True)
    cidade = models.CharField("Cidade", max_length=150)
    declaracao_saude = models.CharField("Declaracao Saude", max_length=255)
    status = models.CharField("Status", max_length=25,
                              default="OK", editable=False)
    desc_declarao_saude = models.CharField(
        "Desc. Declaracao Saude", max_length=255)
    observacoes = models.TextField("Obs.", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado", auto_now=True)

    def __str__(self):
        return f'{self.nome_benef} - CPF: {self.CPF}'
