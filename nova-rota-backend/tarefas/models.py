from django.db import models

class Tarefa(models.Model):

   # STATUS = (
      #  ('Fazendo', 'Fazendo'),
     #   ('Feito', 'Feito')
  #  )

    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    status_tarefa = models.BooleanField()
   # status_tarefa = models.CharField(
       # max_length =7,
       # choices=STATUS,
       # default="Fazendo"
  #  )
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.titulo
