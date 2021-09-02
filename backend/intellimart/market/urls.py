from django.urls import path, include
from .views import *

# Define routes for all the URL Paths
urlpatterns = [
    path('market', StoreView.as_view()),
    path('products', ProductView.as_view()),
    path('users', AllCustomerView.as_view()),
    path('owners', OwnerView.as_view()),
    path('cartprod', CartProductView.as_view()), 
    path('order', PlaceOrderView.as_view()),
    path('register', RegisterCustomer.as_view()),
    path('login', LoginCustomer.as_view()),
    path('slots', SlotView.as_view()), 
    path('addslot', AddSlotView.as_view()),
]
