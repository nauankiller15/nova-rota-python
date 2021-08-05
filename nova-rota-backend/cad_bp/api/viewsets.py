from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from cad_bp.models import Parentesco
from .serializers import ParentescoSerializer


class ParentescoViewSet(ModelViewSet):
    
    queryset = Parentesco.objects.all().order_by('criado_em')
    serializer_class = ParentescoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ativo']
    