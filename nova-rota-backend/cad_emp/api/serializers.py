from rest_framework import serializers
from cad_at.models import Titular

class TitularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titular
        fields = '__all__'