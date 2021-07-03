from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

from cad_at.api.viewsets import TitularViewSet
from cad_at.api.viewsets import TitularParentescos
from cad_bp.api.viewsets import ParentescoViewSet
from cad_emp.api.viewsets import ContratoOperadoraViewSet, ContratoSeguradoraViewSet, EmpresaViewSet
from cad_emp.api.viewsets import FilialViewSet
from cad_emp.api.viewsets import ReajusteViewSet
from cad_emp.api.viewsets import SinistroViewSet
from novidades.api.viewsets import NovidadesViewSet
from tarefas.api.viewsets import TarefaViewSet

router = routers.DefaultRouter()
router.register(r'titular', TitularViewSet)
router.register(r'lista-parentesco', TitularParentescos, basename='lista-parentesco')
router.register(r'parentesco', ParentescoViewSet)
router.register(r'tarefas', TarefaViewSet)
router.register(r'empresa', EmpresaViewSet)
router.register(r'filial', FilialViewSet)
router.register(r'contrato-operadora', ContratoOperadoraViewSet)
router.register(r'contrato-seguradora', ContratoSeguradoraViewSet)
router.register(r'reajuste', ReajusteViewSet)
router.register(r'sinistro', SinistroViewSet)
router.register(r'novidades', NovidadesViewSet)

urlpatterns = [
    path('api/login/', obtain_jwt_token),
    path('accounts/', include('accounts.urls')),
    path('api/', include(router.urls)),
    # path('api/auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('', include('public.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)