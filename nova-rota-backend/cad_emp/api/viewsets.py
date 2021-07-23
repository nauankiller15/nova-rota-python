from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['empresa']

class ContratoSeguradoraViewSet(ModelViewSet):
    queryset = ContratoSeguradora.objects.all()
    serializer_class = ContratoSeguradoraSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['empresa']


class ReajusteViewSet(ModelViewSet):
    queryset = Reajuste.objects.all().order_by('ano_vigencia')
    serializer_class = ReajusteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['empresa']

class SinistralidadeViewSet(ModelViewSet):
    queryset = Sinistralidade.objects.all().order_by('ano')
    serializer_class = SinistralidadeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['empresa']