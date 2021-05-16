from rest_framework.viewsets import ModelViewSet
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    queryset = Parentesco.objects.all()
    serializer_class = ParentescoSerializer