from relatorio.models import Relatorio
from rest_framework import serializers


class RelatorioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Relatorio
        fields = '__all__'
