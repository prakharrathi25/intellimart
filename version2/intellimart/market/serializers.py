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
            first_name=self.validated_data['name'],
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

''' Log in Customer Serializer Class which handles email and password '''
class LoginCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('email', 'password') 
