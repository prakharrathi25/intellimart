from itertools import product
from django.db.models import fields
from rest_framework import serializers
from .models import *

''' Define different classes which will be serializing our original models '''
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

class SlotSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Slot
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'

''' Data storage Serializers '''

''' Register Customer Serializer Class '''
class RegisterCustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Customer
        fields = ('name', 'email', 'phone', 'password')

        extra_kwargs = {
            'password': {'write_only' : True}
        }
    
    # Function to save a new user
    def save(self):

        new_customer = Customer(
            email=self.validated_data['email'],
            name=self.validated_data['name'],
            phone=self.validated_data['phone'],
        )

        # Check if the email already exists or not 
        if new_customer.is_exists():
            raise serializers.ValidationError({
                'error':'This user already exists!'
            })

        # Get the password
        password = self.validated_data['password']

        # Set the password and save the new registeration
        new_customer.set_password(password)
        new_customer.save()
        
        return new_customer

''' Serializer to add the data to the Cart '''
class AddCartProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartProduct
        fields = ('user', 'product', 'quantity', 'price')
    
    # Function to save a new cart product
    def save(self):

        new_cart_product = CartProduct(
            user=self.validated_data['user'],
            price=self.validated_data['price'],
            product=self.validated_data['product'],
            quantity=self.validated_data['quantity']
        )
        
        print(new_cart_product.user, type(new_cart_product.user))
        
        # Check if the quantity is greater than the store product
        # store_product = Product.objects.get(id=new_cart_product.product)
        given_quantity = new_cart_product.quantity
        existing_quantity = new_cart_product.product.quantity
        
        if given_quantity > existing_quantity:
            raise serializers.ValidationError({
                'error':'The quantity enterred is greater than the quantity available!'
            })
            

        # Save the new cart product
        new_cart_product.save()
        
        return new_cart_product

''' Log in Customer Serializer Class which handles email and password '''
class LoginCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('email', 'password') 

