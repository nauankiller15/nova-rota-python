from rest_framework.viewsets import ModelViewSet
from cad_emp.models import Empresa
from .serializers import EmpresaSerializer


class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer