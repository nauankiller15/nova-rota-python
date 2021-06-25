from rest_framework.viewsets import ModelViewSet
from novidades.models import Novidade
from .serializers import NovidadeSerializer
from rest_framework.response import Response


class NovidadesViewSet(ModelViewSet):
    queryset = Novidade.objects.all()
    serializer_class = NovidadeSerializer

    def list(self, request, *args, **kwargs):
        queryset = Novidade.objects.all()
        serializer = NovidadeSerializer(queryset, many=True)
        return Response(serializer.data)