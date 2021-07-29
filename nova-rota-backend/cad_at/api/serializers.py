from rest_framework import serializers
from cad_at.models import Titular


class TitularSerializer(serializers.ModelSerializer):
    
    prioridade = serializers.SerializerMethodField()

    def get_prioridade(self, obj):
        return obj.prioridade()

    class Meta:
        model = Titular
        fields = '__all__'
