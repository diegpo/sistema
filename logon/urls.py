from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Importa seus viewsets
from logon.views import MoradorViewSet, PetViewSet, VeiculoViewSet, index, dashboard, sair

# Cria o roteador da API
router = routers.DefaultRouter()
router.register(r'moradores', MoradorViewSet)
router.register(r'pets', PetViewSet)
router.register(r'veiculos', VeiculoViewSet)

# Configurações da documentação
schema_view = get_schema_view(
    openapi.Info(
        title="API do Sistema de Condomínio",
        default_version='v1',
        description="""
        Documentação das APIs de Moradores, Pets e Veículos.  
        Utilize os endpoints abaixo para testar as operações CRUD do sistema.
        """,
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="diego.test.tec@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    
    
    # Rotas principais do sistema
    path('', index, name='index'),
    path('dashboard/', dashboard, name='dashboard'),
    path('sair/', sair, name='sair'),

    # Rotas da API
    path('api/', include(router.urls)),

    # Documentação Swagger e Redoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
