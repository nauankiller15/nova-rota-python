from django.contrib.auth.models import User
from django.db import models

CARGO_CHOICES = (
    ('gestor', 'gestor'),
    ('funcionario', 'funcionario'),
)

class Cargo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cargo = models.CharField(max_length=50, choices=CARGO_CHOICES)
    