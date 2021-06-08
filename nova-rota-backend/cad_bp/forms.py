from input_mask.widgets import InputMask
from django import forms
from .models import Parentesco

class ParentescoForm(InputMask):
    class Meta:
        mask = {'cpf': '000.000.000-00'}
        model = Parentesco
        fields = ('CPF')