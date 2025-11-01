from django.db import models

class Morador(models.Model):
    nome = models.CharField(max_length=100)
    apartamento = models.CharField(max_length=10)
    torre = models.CharField(max_length=50)
    veiculo = models.CharField(max_length=50)
    contato = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Pet(models.Model):
    nome = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    dono = models.CharField(max_length=100)
    contato = models.CharField(max_length=100)
    obs = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nome


class Veiculo(models.Model):
    tipo = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    placa = models.CharField(max_length=10)
    apartamento = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.tipo} - {self.placa}"
