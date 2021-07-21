from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    queryset = Parentesco.objects.all().order_by('criado_em')
    serializer_class = ParentescoSerializer

    def list(self, request, *args, **kwargs):
        print('novo', request.user)
        queryset = Parentesco.objects.all()
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        parentesco = Parentesco.objects.filter(id=pk).last()
        serializer = ParentescoSerializer(parentesco)
        json_response = serializer.data
        json_response['titular_nome'] = parentesco.titular.nome_benef
        return Response(json_response)