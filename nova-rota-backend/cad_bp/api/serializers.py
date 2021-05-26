from rest_framework import serializers
from cad_bp.models import Parentesco

class ParentescoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parentesco
        fields = '__all__'