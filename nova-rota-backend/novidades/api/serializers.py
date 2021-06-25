from rest_framework import serializers
from novidades.models import Novidade

class NovidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novidade
        fields = '__all__'

class NovidadeSimplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novidade
        fields = ['id', 'titulo']