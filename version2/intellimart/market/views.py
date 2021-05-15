from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.

''' API View to return the data to the frontend ''' 

class StoreView(generics.ListAPIView):
    """Store view which returns the store data as a Json file. 
    """

    queryset = Store.objects.all()
    serializer_class = StoreSerializer