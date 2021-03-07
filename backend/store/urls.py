from django.contrib import admin
from django.urls import path
from .views import *

''' Map URLs from the store app'''
urlpatterns = [
    path('', index)
]
