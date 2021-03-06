from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)




# Automatic model registration
# from django.apps import apps
#
# models = apps.get_models()
# print(models)
# for model in models:
#     admin.site.register(model)
