from datetime import datetime
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
            carteirinha = 'PROCESSADO',
            usuario = request.user
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        dependente = dict(serializer.validated_data)
        titular = dependente['titular']

        Relatorio.objects.create(
            cod_empresa = dependente['cod_empresa'],
            data_inclusao = datetime.now().date(),
            prioridade = 'prioridade',
            tipo = "INCL. DEP",
            CPF = dependente['CPF'],
            nome = f"{dependente['nome']} (TIT {titular.nome} - {titular.carteirinha})",
            carteirinha = dependente['carteirinha'],
            usuario = self.request.user
        )

        return super().perform_create(serializer)
    
    def perform_update(self, serializer):

        dados = dict(serializer.validated_data)
        if 'transferido' in dados and dados['transferido'] == True:
            tipo = 'TRANSF. DEP'
        else:
            tipo = "ALT. DEP"

        serializer.save()
        dependente = serializer.data

        Relatorio.objects.create(
            cod_empresa = dependente['cod_empresa'],
            data_inclusao = dependente['criado_em'][:10],
            prioridade = dependente['prioridade'],
            tipo = tipo,
            CPF = dependente['CPF'],
            nome = dependente['nome'],
            carteirinha = dependente['carteirinha']  if 'carteirinha' in dependente else '',
            usuario = self.request.user
        )

        return Response(dependente)