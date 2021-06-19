from rest_framework.viewsets import ModelViewSet
from cad_emp.models import Empresa, Filial
from .serializers import EmpresaSerializer, FilialSerializer


class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class FilialViewSet(ModelViewSet):
    queryset = Filial.objects.all()
    serializer_class = FilialSerializer