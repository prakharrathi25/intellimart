from django.shortcuts import render
from django.http import HttpResponse

''' Store App Views '''

# Home page view
def index(request):
    return render(request, 'index.html')
