from django.urls import path
from logon.views import index

urlpatterns = [
    path('', index)
]
