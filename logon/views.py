from django.shortcuts import render

def index(request):
    return render(request, 'logon/index.html')
