from django.contrib import admin
from django.urls import path
from . import views

''' Map URLs from the store app'''
urlpatterns = [
    path('', views.Index.as_view(), name='homepage'),
    path('signup', views.signup),
    path('login', views.Login.as_view())
]
