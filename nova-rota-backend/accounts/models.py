from django.contrib.auth.models import User
from django.db import models

class Usuario(models.Model):
    CARGO_CHOICES = (
        ('proprietario', 'proprietario'),
        ('funcionario', 'funcionario'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cargo = models.CharField(max_length=50, choices=CARGO_CHOICES)