from django.core.exceptions import ValidationError

from cad_emp.models import Empresa

def cod_empresa_existe(cod_empresa):
    empresa = Empresa.objects.filter(cod_empresa=cod_empresa).last()
    if empresa == None:
        raise ValidationError({'Código da Empresa': 'Nenhuma empresa cadastrada com esse código'})