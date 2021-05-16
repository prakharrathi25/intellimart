from django.urls import path, include
from .views import *

urlpatterns = [
    path('market', StoreView.as_view()),    # Redirect to store urls as well
    path('register', RegisterCustomer.as_view())
]
