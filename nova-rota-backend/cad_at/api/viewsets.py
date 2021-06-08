from cad_bp.models import Parentesco
from django.http import Http404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from cad_bp.api.serializers import ParentescoSerializer
from cad_at.models import Titular
from .serializers import TitularSerializer


class TitularViewSet(ModelViewSet):
    queryset = Titular.objects.all()
    serializer_class = TitularSerializer

    def list(self, request, *args, **kwargs):
        queryset = Titular.objects.all()
        serializer = TitularSerializer(queryset, many=True)
        return Response(serializer.data)


class TitularParentescos(ViewSet):

    def list(self, request):
        queryset = Parentesco.objects.all().order_by('criado_em')
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_titular(self, pk):
        try:
            return Titular.objects.get(pk=pk)
        except Titular.DoesNotExist:
            raise Http404

    def retrieve(self, request, pk=None):
        titular = self.get_titular(pk)
        queryset = titular.parentesco_set.all()
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)