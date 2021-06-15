from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from cad_at.api.viewsets import TitularViewSet
from cad_at.api.viewsets import TitularParentescos
from cad_bp.api.viewsets import ParentescoViewSet
from cad_emp.api.viewsets import EmpresaViewSet
from cad_emp_filial.api.viewsets import EmpresaFilialViewSet
from tarefas.api.viewsets import TarefaViewSet

router = routers.DefaultRouter()
router.register(r'titular', TitularViewSet)
router.register(r'lista-parentesco', TitularParentescos, basename='lista-parentesco')
router.register(r'parentesco', ParentescoViewSet)
router.register(r'tarefas', TarefaViewSet)
router.register(r'empresa', EmpresaViewSet)
router.register(r'empresa-filial', EmpresaFilialViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', include('principal.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)