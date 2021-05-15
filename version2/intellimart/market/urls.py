from django.urls import path, include
from .views import *

urlpatterns = [
    path('stores', StoreView.as_view()),    # Redirect to store urls as well
]
