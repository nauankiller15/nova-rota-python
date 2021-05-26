from rest_framework.viewsets import ModelViewSet
from cad_emp_filial.models import EmpresaFilial
from .serializers import EmpresaFilialSerializer


class EmpresaFilialViewSet(ModelViewSet):
    queryset = EmpresaFilial.objects.all()
    serializer_class = EmpresaFilialSerializer