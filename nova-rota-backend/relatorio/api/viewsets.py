from datetime import date, timedelta
from django.core.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from relatorio.models import Relatorio
from .serializers import RelatorioSerializer


class RelatorioViewSet(ViewSet):

    def list(self, request, dados_vigencia):
    
        
        vigencia = dados_vigencia.split('-')
        periodo = vigencia[0]
        dia = 1 if periodo == '1' else 15
        mes = int(vigencia[1]) + 1 # vigencia vem do array de meses em que janeiro tem indice 0
        ano = int(vigencia[2])

        if mes < 1 or mes > 12:
            raise ValidationError({'Data': 'Data Inválida'})
        
        inicio = date(ano, mes, dia)
        fim = date(ano, mes, 15)
        if inicio.day == 15:
            fim_dia = 1
            if inicio.month == 12:
                fim_mes = 1
                fim_ano = inicio.year + 1
            else:
                fim_mes = inicio.month + 1
                fim_ano = inicio.year
            fim = date(fim_ano, fim_mes, fim_dia)


        dados = Relatorio.objects.filter(mes_vigencia__gte=inicio, mes_vigencia__lt=fim)
        data = RelatorioSerializer(dados, many=True).data
        
        return Response(data)
