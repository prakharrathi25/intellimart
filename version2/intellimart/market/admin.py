from django.contrib import admin
from .models import *


# Register your models here.
'''
Configure Admin Side Views for each model:

This controls how they appear on the admin view panel

'''
class AdminStore(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'address', 'owner']

class AdminProduct(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'quantity', 'category', 'store']

class AdminCategory(admin.ModelAdmin):
    list_display = ['id', 'name']

class AdminCustomer(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email']

class AdminOwner(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email']

class AdminCart(admin.ModelAdmin):
    list_display = ['id', 'user', 'products']

class AdminCartProduct(admin.ModelAdmin):
    list_display = ['id', 'cart', 'user', 'product', 'quantity']


''' MODEL REGISTRATION '''
admin.site.register(Product, AdminProduct)
admin.site.register(Category, AdminCategory)
admin.site.register(Customer, AdminCustomer)
admin.site.register(Store, AdminStore)
admin.site.register(Owner, AdminOwner)
admin.site.register(Cart)
admin.site.register(CartQuantity)
admin.site.register(CartProduct, AdminCartProduct)