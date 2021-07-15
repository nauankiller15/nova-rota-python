from rest_framework.viewsets import ModelViewSet
from tarefas.models import Tarefa
from .serializers import TarefaSerializer
from rest_framework.response import Response


class TarefaViewSet(ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer