from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'departamentos', views.departamentoViewSet)
router.register(r'municipios', views.municipioViewSet)
router.register(r'sitios-turisticos', views.sitioTuristicoViewSet)
router.register(r'servicios', views.servicioViewSet)
router.register(r'tipos-servicios', views.tipoServicioViewSet)
router.register(r'comentarios', views.comentarioViewSet)
router.register(r'usuarios', views.userViewSet)


urlpatterns = [
    path('', include(router.urls))
]