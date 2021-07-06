from rest_framework import serializers
from cad_emp.models import ContratoOperadora, ContratoSeguradora, Empresa, Filial, Sinistralidade, Reajuste


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class FilialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filial
        fields = '__all__'


class ContratoOperadoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContratoOperadora
        fields = '__all__'


class ContratoSeguradoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContratoSeguradora
        fields = '__all__'


class ReajusteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reajuste
        fields = '__all__'


class SinistralidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sinistralidade
        fields = '__all__'