from rest_framework import serializers
from cad_at.models import Titular


class TitularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titular
        fields = '__all__'


class TitularSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Titular
        fields = ['nome_benef']


