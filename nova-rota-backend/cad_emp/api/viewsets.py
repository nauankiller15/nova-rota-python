from rest_framework.viewsets import ModelViewSet
from cad_at.models import Titular
from .serializers import TitularSerializer


class TitularViewSet(ModelViewSet):
    queryset = Titular.objects.all()
    serializer_class = TitularSerializer