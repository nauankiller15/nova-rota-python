from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from accounts.models import Cargo
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from accounts.api.serializers import ManipularUsuarioSerializer, UserSerializer, CargoSerializer
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ViewSet
from permissions.permissions import Gestor, GestorOrReadOnly, OwnerOnly


class UsuarioViewSet(ListCreateAPIView, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser | GestorOrReadOnly]

class ManipularUsuarioViewSet(RetrieveUpdateAPIView, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = ManipularUsuarioSerializer
    permission_classes = [IsAdminUser | GestorOrReadOnly]


class CargoViewSet(ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [IsAdminUser | GestorOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']


class DadosUsuarioViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = UserSerializer(request.user)
        data = serializer.data

        if request.user.is_staff:
            data['cargo'] = 'desenvolvedor'
        else:
            cargo = Cargo.objects.filter(user=request.user.id).last()
            if cargo:
                data['cargo'] = cargo.cargo
        
        return Response(data)
        