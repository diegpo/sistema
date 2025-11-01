from django.urls import include, path
from rest_framework import routers
from . import views
from .views import MoradorViewSet, PetViewSet, VeiculoViewSet

router = routers.DefaultRouter()
router.register(r'moradores', MoradorViewSet)
router.register(r'pets', PetViewSet)
router.register(r'veiculos', VeiculoViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('sair/', views.sair, name='sair'),
    path('api/', include(router.urls)),
]
