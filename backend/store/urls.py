from django.contrib import admin
from django.urls import path
from . import views

''' Map URLs from the store app'''
urlpatterns = [
    path('', views.index, name='homepage'),
    path('signup', views.signup),
    path('login', views.login)
]
