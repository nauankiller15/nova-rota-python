from input_mask.widgets import InputMask
from django import forms
from .models import Titular

class TitularForm(InputMask):
    class Meta:
        mask = {'cpf': '000.000.000-00'}
        model = Titular
        fields = ('CPF')