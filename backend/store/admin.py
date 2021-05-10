from django.contrib import admin
from .models import *


'''

Configure Admin Side Views for each model:

This controls how they appear on the admin view panel

'''
class AdminProduct(admin.ModelAdmin):
    list_display = ['name', 'price', 'quantity', 'category']

class AdminCategory(admin.ModelAdmin):
    list_display = ['name']

class AdminCustomer(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email']


''' MODEL REGISTRATION '''
admin.site.register(Product, AdminProduct)
admin.site.register(Category, AdminCategory)
admin.site.register(Customer, AdminCustomer)
