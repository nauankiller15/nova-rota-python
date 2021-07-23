from rest_framework.viewsets import ModelViewSet
from tarefas.models import Tarefa
from .serializers import TarefaSerializer
from rest_framework.exceptions import PermissionDenied


class TarefaViewSet(ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    def list(self, request, *args, **kwargs):
        self.queryset = Tarefa.objects.filter(usuario=request.user.id)
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        request.data['usuario'] = request.user.id
        return super().create(request, *args, **kwargs)
