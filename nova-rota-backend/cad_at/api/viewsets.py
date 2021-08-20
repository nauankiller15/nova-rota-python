from datetime import datetime
from relatorio.models import Relatorio
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from cad_bp.models import Parentesco
from cad_bp.api.serializers import ParentescoSerializer
from cad_at.models import Titular
from .serializers import TitularSerializer


class TitularViewSet(ModelViewSet):

    queryset = Titular.objects.all()
    serializer_class = TitularSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ativo', 'CPF']
    usuario = None

    # def initial(self, request, *args, **kwargs):
    #     usuario = request.user
    #     return super().initial(request, *args, **kwargs)

    def destroy(self, request, pk):
        titular = get_object_or_404(Titular, id=pk)
        titular.ativo = False
        titular.save()

        Relatorio.objects.create(
            cod_empresa = titular.cod_empresa,
            data_inclusao = titular.criado_em,
            prioridade = titular.prioridade(),
            tipo = "EXCL. TIT",
            CPF = titular.CPF,
            nome = f'{titular.nome} ({titular.carteirinha})',
            carteirinha = 'PROCESSADO',
            usuario = request.user
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def perform_create(self, serializer):
        titular = dict(serializer.validated_data)

        Relatorio.objects.create(
            cod_empresa = titular['cod_empresa'],
            data_inclusao = datetime.now().date(),
            prioridade = 'prioridade',
            tipo = "INCL. TIT",
            CPF = titular['CPF'],
            nome = titular['nome'],
            carteirinha = titular['carteirinha'],
            usuario = self.request.user
        )
        return super().perform_create(serializer)
    


class TitularParentescos(ViewSet):

    def list(self, request):
        queryset = Parentesco.objects.all().order_by('criado_em')
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_titular(self, pk):
        try:
            return Titular.objects.get(pk=pk)
        except Titular.DoesNotExist:
            raise ValidationError({'Titular': 'Titular não encontrado'})

    def retrieve(self, request, pk=None):
        titular = self.get_titular(pk)
        queryset = titular.parentesco_set.all()
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(request, serializer.data)