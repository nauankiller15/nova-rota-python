from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ViewSet
from django_filters.rest_framework import DjangoFilterBackend

from relatorio.models import Relatorio
from .serializers import RelatorioSerializer


class RelatorioViewSet(ViewSet):

    def list(self, request, vigencia):
        print(vigencia)
        return Response({'aa':'aaaa'})
