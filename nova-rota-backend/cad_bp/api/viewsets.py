from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from cad_at.models import Titular
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    queryset = Parentesco.objects.all()
    serializer_class = ParentescoSerializer

    def list(self, pk):
        print('=' * 20)
        print(pk)
        titular = Titular.objects.filter(id=1).last()
        queryset = titular.parentesco_set.all()
        serializer = ParentescoSerializer(queryset, many=True)
        return Response(serializer.data)

