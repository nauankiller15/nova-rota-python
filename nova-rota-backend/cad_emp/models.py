from django.db import models

class Empresa (models.Model):

    CNPJ = models.CharField("CNPJ", null=False, max_length=18, unique=True)
    cod_empresa = models.CharField("Codigo Empresa", max_length=25, null=False, unique=True)
    data_recebimento = models.DateField(
        "Data Recebimento", auto_now=False, auto_now_add=False, blank=True, null=False)
    tipo_contrato = models.CharField("Tipo Cadastro", max_length=25,
                                     default="Inclusão de Titular", editable=False)
    razao_social = models.CharField("Razão Social", max_length=255)
    anexo_doc_emp = models.ImageField(upload_to='anexo_empresa', blank=True, null=True)
    vencimento_boleto = models.DateField(
        "Vencimento do Boleto", auto_now=False, auto_now_add=False, null=False)
    inicio_vigencia = models.DateField(
        "Inicio de Vigência", auto_now=False, auto_now_add=False, null=False)
    historico_reajuste = models.CharField("Histórico de Reajuste", max_length=100, null=True)
    historico_sinistro = models.CharField("Histórico de Sinistralidade", max_length=100, null=True)
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
