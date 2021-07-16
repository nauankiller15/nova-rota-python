from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from tarefas.models import Tarefa
from .serializers import TarefaSerializer
from rest_framework.exceptions import PermissionDenied


class TarefaViewSet(ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    def list(self, request, *args, **kwargs):
        dados = dados_usuario(request)
        self.queryset = Tarefa.objects.filter(usuario=dados['user'])
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        dados = dados_usuario(request)
        if request.data['usuario'] != dados['user'].id:
            raise PermissionDenied('ID do Usuário Inválido')
        return super().create(request, *args, **kwargs)

def dados_usuario(request):
    token = request.META.get('HTTP_AUTHORIZATION', b'').replace('JWT ', '')
    verificacaoToken = VerifyJSONWebTokenSerializer()
    dados = verificacaoToken.validate({'token': token})
    return dados