from django_filters.rest_framework.backends import DjangoFilterBackend

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from relatorio.models import Relatorio
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    
    queryset = Parentesco.objects.all().order_by('criado_em')
    serializer_class = ParentescoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ativo', 'CPF']

    def destroy(self, request, pk):
        dependente = get_object_or_404(Parentesco, id=pk)
        dependente.ativo = False
        dependente.save()

        Relatorio.objects.create(
            cod_empresa = dependente.cod_empresa,
            data_inclusao = dependente.criado_em,
            prioridade = dependente.prioridade(),
            tipo = "EXCL. DEP",
            CPF = dependente.CPF,
            nome = f'{dependente.nome} ({dependente.carteirinha})',
            carteirinha = 'PROCESSADO'
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
    