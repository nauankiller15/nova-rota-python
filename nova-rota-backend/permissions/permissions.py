from django.shortcuts import get_object_or_404

from rest_framework.permissions import BasePermission, SAFE_METHODS

from accounts.models import Cargo

class Gestor(BasePermission):

    def has_permission(self, request, view):

        cargo = get_object_or_404(Cargo, user=request.user)
        if cargo.cargo == "gestor":
            return True

class GestorOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            cargo = get_object_or_404(Cargo, user=request.user)
            if request.method in SAFE_METHODS or cargo.cargo == "gestor":
                return True
        
        return False

class OwnerOnly(BasePermission):

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user