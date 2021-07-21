from django.shortcuts import get_object_or_404

from rest_framework.permissions import BasePermission

from accounts.models import Usuario

class Proprietario(BasePermission):

    def has_object_permission(self, request, view, obj):
      
        usuario = get_object_or_404(Usuario, user=request.user)
        if usuario.cargo == "proprietario":
            return True
