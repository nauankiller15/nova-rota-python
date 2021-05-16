from rest_framework.viewsets import ModelViewSet
from tarefas.models import Tarefa
from .serializers import TarefaSerializer, TarefaSimplesSerializer
from rest_framework.response import Response


class TarefaViewSet(ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    def list(self, request, *args, **kwargs):
        queryset = Tarefa.objects.all()
        serializer = TarefaSimplesSerializer(queryset, many=True)
        return Response(serializer.data)