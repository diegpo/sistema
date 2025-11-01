from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from .models import Morador, Pet, Veiculo
from .serializers import MoradorSerializer, PetSerializer, VeiculoSerializer

def index(request):
    if request.method == "POST":
        usuario = request.POST.get("usuario")
        senha = request.POST.get("senha")

        user = authenticate(request, username=usuario, password=senha)

        if user is not None:
            login(request, user)  # cria sessão
            return redirect("dashboard")
        else:
            return render(request, "logon/index.html", {"error": "Usuário ou senha inválidos"})

    return render(request, "logon/index.html")


@login_required(login_url="/")  # força login
def dashboard(request):
    return render(request, "dashboard.html")


def sair(request):
    logout(request)
    return redirect("index")



class MoradorViewSet(viewsets.ModelViewSet):
    queryset = Morador.objects.all()
    serializer_class = MoradorSerializer

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
