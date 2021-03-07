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


''' MODEL REGISTRATION '''
admin.site.register(Product, AdminProduct)
admin.site.register(Category, AdminCategory)




# Automatic model registration
# from django.apps import apps
#
# models = apps.get_models()
# print(models)
# for model in models:
#     admin.site.register(model)
