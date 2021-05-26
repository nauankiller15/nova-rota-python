from rest_framework import serializers
from cad_emp_filial.models import EmpresaFilial

class EmpresaFilialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpresaFilial
        fields = '__all__'