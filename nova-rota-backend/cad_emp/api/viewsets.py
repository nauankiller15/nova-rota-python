from rest_framework.viewsets import ModelViewSet
from cad_emp.models import ContratoOperadora, ContratoSeguradora, Empresa, Filial, Reajuste, Sinistralidade
from .serializers import ContratoOperadoraSerializer, ContratoSeguradoraSerializer, EmpresaSerializer, FilialSerializer, ReajusteSerializer, SinistralidadeSerializer


class EmpresaViewSet(ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class FilialViewSet(ModelViewSet):
    queryset = Filial.objects.all()
    serializer_class = FilialSerializer


class ContratoOperadoraViewSet(ModelViewSet):
    queryset = ContratoOperadora.objects.all()
    serializer_class = ContratoOperadoraSerializer


class ContratoSeguradoraViewSet(ModelViewSet):
    queryset = ContratoSeguradora.objects.all()
    serializer_class = ContratoSeguradoraSerializer



class ReajusteViewSet(ModelViewSet):
    queryset = Reajuste.objects.all()
    serializer_class = ReajusteSerializer


class SinistroViewSet(ModelViewSet):
    queryset = Sinistralidade.objects.all()
    serializer_class = SinistralidadeSerializer