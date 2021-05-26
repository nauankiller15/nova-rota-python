from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from cad_at.models import Titular
from .serializers import TitularSerializer


class TitularViewSet(ModelViewSet):
    queryset = Titular.objects.all()
    serializer_class = TitularSerializer

    def list(self, request, *args, **kwargs):
        queryset = Titular.objects.all()
        serializer = TitularSerializer(queryset, many=True)
        return Response(serializer.data)