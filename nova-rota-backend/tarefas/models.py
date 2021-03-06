from django.db import models
from django.contrib.auth.models import User

class Tarefa(models.Model):

   titulo = models.CharField(max_length=255)
   descricao = models.TextField()
   status_tarefa = models.BooleanField(default=False)
   usuario = models.ForeignKey(User, on_delete=models.CASCADE)
   criado_em = models.DateTimeField(auto_now_add=True)
   atualizado_em = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.titulo