from django.db import models

class Registro(models.Model):

    STATUS = (
        ('Fazendo', 'Fazendo'),
        ('Feito', 'Feito')
    )

    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    feito = models.CharField(
        max_length =7,
        choices=STATUS,
    )
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)