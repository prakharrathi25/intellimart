from itertools import product
from django.db.models import fields
from rest_framework import serializers
from .models import *

''' Generic Serializer for Nested Queries '''
class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)

''' Define different classes which will be serializing our original models '''
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

# class CartProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CartProduct
#         fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['store_details'] = StoreSerializer(instance.store).data
        return response

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product_details'] = ProductSerializer(instance.product).data
        return response

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

        # Get the user and product from the data 
        user_id = self.validated_data['user']
        product_id = self.validated_data['product']

        # Create a new user instance 
        new_cart_product = CartProduct(
                user=self.validated_data['user'],
                price=self.validated_data['price'],
                product=self.validated_data['product'],
                quantity=self.validated_data['quantity']
        )

        # set price based on the db value
        new_cart_product.price = new_cart_product.product.price
        
        # Check if the quantity is greater than the store product
        given_quantity = new_cart_product.quantity
        existing_quantity = new_cart_product.product.quantity
        
        if given_quantity > existing_quantity:
            raise serializers.ValidationError({
                'error':'The quantity enterred is greater than the quantity available!'
            })

        # filter by user and product 
        queryset = CartProduct.objects.filter(user=user_id, product=product_id)
        
        if queryset:
            
            # Get quantity 
            q = self.validated_data['quantity']

            # Check if quantity is zero then delete
            if q == 0: 
                
                # delete the object 
                queryset.delete()
            
            else: 
                queryset.update(quantity=q)
        
            # new_cart_product = CartProduct(
            #     user=self.validated_data['user'],
            #     price=self.validated_data['price'],
            #     product=self.validated_data['product'],
            #     quantity=self.validated_data['quantity']
            # )
    
        else: 
            # Save the new cart product
            new_cart_product.save()

        # return the object created
        return new_cart_product

''' Serializer to save the details of the slot that a user sends '''
class SlotSelectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Slot
        fields = ('user', 'slot')
    
    # Function to save a new slot in the model
    def save(self):

        # Get the data from the slot 
        user_id = self.validated_data['user']
        slot_id = self.validated_data['slot']

        print("GET vals", user_id, slot_id)
        # Get the slot details based on the slot id
        slot_details = Slot.objects.get(id=slot_id)
        user_details = Customer.objects.get(id=user_id)
        
        slot_details.total_people += 1
        user_details.stores.add(Store.objects.get(id=slot_details.store))
        
        return (user_id, slot_id)
        # print(new_cart_product.user, type(new_cart_product.user))
        
        # # Check if the quantity is greater than the store product
        # # store_product = Product.objects.get(id=new_cart_product.product)
        # given_quantity = new_cart_product.quantity
        # existing_quantity = new_cart_product.product.quantity
        
        # if given_quantity > existing_quantity:
        #     raise serializers.ValidationError({
        #         'error':'The quantity enterred is greater than the quantity available!'
        #     })
        
        # return new_cart_product

''' Log in Customer Serializer Class which handles email and password '''
class LoginCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('email', 'password') 

