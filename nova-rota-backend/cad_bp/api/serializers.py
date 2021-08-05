from rest_framework import serializers
from cad_bp.models import Parentesco

class ParentescoSerializer(serializers.ModelSerializer):
    
    prioridade = serializers.SerializerMethodField()
    titular_nome = serializers.SerializerMethodField()
    

    def get_prioridade(self, obj):
        return obj.prioridade()

    def get_titular_nome(self, obj):    
        return obj.titular.nome_benef


    class Meta:
        model = Parentesco
        fields = '__all__'