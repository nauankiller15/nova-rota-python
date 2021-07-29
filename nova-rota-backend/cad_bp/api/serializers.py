from rest_framework import serializers
from cad_bp.models import Parentesco

class ParentescoSerializer(serializers.ModelSerializer):
    
    prioridade = serializers.SerializerMethodField()

    def get_prioridade(self, obj):
        return obj.prioridade()


    class Meta:
        model = Parentesco
        fields = '__all__'