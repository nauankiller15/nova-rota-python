from django.db.models import Model
from django.db.models import DateField
from django.db.models import CharField
from django.db.models import ForeignKey

class Relatorio(Model):

    mes_vigencia = DateField(auto_now=True)
    cod_empresa = CharField(max_length=25)
    data_inclusao = DateField()
    prioridade = CharField(max_length=25)
    tipo = CharField(max_length=25)
    CPF = CharField(max_length=14)
    nome = CharField(max_length=255)
    carteirinha = CharField(max_length=35)
    usuario = CharField(max_length=100)

    class Meta:
        ordering = ['-id']
