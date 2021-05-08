from django.shortcuts import render

def taskList(requst):
    return render(request, 'include/lista.html')


def yourName(request, name)
    return render(request, 'include/yourname.html', {'name': name})
