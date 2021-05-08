from django.shortcuts import render
from django.http import HttpResponse

def principal(request):
    return render(request, 'principal/index.html')