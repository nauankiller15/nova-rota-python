from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    queryset = Parentesco.objects.all()
    serializer_class = ParentescoSerializer

    def list(self, request, *args, **kwargs):
        queryset = Parentesco.objects.all()
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)