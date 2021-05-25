from django.db.models import query
from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from itertools import chain
from rest_framework import viewsets

# Custom  modules
from .models import *
from .serializers import *

# Create your views here.

''' API Views to return the data to the frontend ''' 

class StoreView(generics.ListAPIView):
    """Store view which returns the stores data as a Json file. 
    """

    # Define class variables 
    queryset = []

    # Manage a get request 
    def get(self, request): 
        
        ''' Display all the stores in our database if no id is passed 
            and if an ID is passed then show the store with ID '''
        
        # Collect the id for the store to be displayed
        store_id = request.GET.get('id')

        if store_id:
            queryset = Store.get_store_by_id(store_id)
        else: 
            queryset = Store.get_all_stores()
        
        return Response(StoreSerializer(queryset, many = True).data)

class ProductView(generics.ListAPIView):
    ''' Product View to return the details of all the products and filter by ID or string '''

    # Define class variables 
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    search_fields = ['name','description']
    filter_backends = (SearchFilter,)
    queryset = []

    # Manage a get request
    def get(self, request):
        
        ''' Display all the products in our database if no id is passed 
            and if a store ID and search is passed then use those parameters'''
        
        # Get all the parameters sent in the data 
        store_id = request.GET.get('store_id', None)
        search_query = request.GET.get('search')
        category = request.GET.get('category')

        queryset = Product.get_products(store_id=store_id,
                                        category_id=category,
                                        search_query=search_query)

        return Response(ProductSerializer(queryset, many = True).data)

class CartProductView(generics.ListAPIView):
    
    ''' View to display cart items and add items to the cart '''

    # Define class variables 
    serializer_class = CartProductSerializer
    queryset = []

    def delete(self, request):
        
        id = request.GET.get['id']
        print(id)
        # delete the product using ID and send a confirmation response
        CartProduct.objects.get(id=id).delete()
        return Response({
            'status':True
        }, status=status.HTTP_204_NO_CONTENT)

    def get(self, request):

        ''' Display all the cart items queried by different id paramters '''
        user_id = request.GET.get('user')
        product_id = request.GET.get('product')
        is_ordered = request.GET.get('ordered') 

        queryset = CartProduct.get_cart_product(product_id=product_id, 
                                                user_id=user_id,
                                                is_ordered=is_ordered)
        
        return Response(CartProductSerializer(queryset, many=True).data)
    
    def post(self, request):

        ''' Save the item in the cart once the cart data is sent'''
        
        # Create a serializer instance 
        serializer = AddCartProductSerializer(data=request.data) 

        data = {}    # Data to be returned to the user
    
        if serializer.is_valid():
            new_cart_prod = serializer.save()
            data['success'] = 'True'
            data['user'] = new_cart_prod.user.id
            data['price'] = new_cart_prod.price
            data['product'] = new_cart_prod.product.id
            data['quantity'] = new_cart_prod.quantity

        else: 
            data = serializer.errors
        
        return Response(data)

class CartView(generics.ListAPIView):
    
    ''' View to display cart items and add items to the cart '''

    # Define class variables 
    serializer_class = CartSerializer
    queryset = []

    def get(self, request):

        ''' Display all the cart items queried by the user ID '''
         # Collect the id for the store to be displayed
        user_id = request.GET.get('user')

        if user_id:
            queryset = Cart.get_cart_products(user_id)
        
        else:
            queryset = Cart.get_all_products()
        
        
        return Response(CartSerializer(queryset, many = True).data)

class LoginCustomer(APIView):
    ''' View tp login a customer based on their credentials '''

    # Define class variables 
    serializer_class = LoginCustomerSerializer

    # Function to handle a POST request 
    def post(self, request):

        # Create a serializer instance 
        serializer = self.serializer_class(data=request.data)

        data = {}    # Data to be returned to the user

        if serializer.is_valid():
            
            login_input = serializer.data
            
            # Get the data
            email = login_input.get('email')
            password = login_input.get('password')

            # Get the customer details
            customer = Customer.get_customer_by_email(email)

            # Check if the user exists 
            if customer:
                # if check_password(password, customer.password):
                if check_password(password, customer.password):

                    # Return the email ID and success if the password is correct
                    data['success'] = 'True'
                    data['user_id'] = customer.id
                    data['email'] = customer.email

                else:
                    data['error'] = 'Invalid Password'
            else:
                data['error'] = 'User Does not exist'
        
        else: 
            data['error'] = "Some other Error occurred"

        return Response(data)

class RegisterCustomer(APIView):

    ''' View to Register a customer into our database '''

    # Define class variables 
    serializer_class = RegisterCustomerSerializer

    # Function to handle post request
    def post(self, request, format=None):
        
        ''' Session handling for our users '''
        
        # Check if their is an existing session (SESSION)
        # if not self.request.session.exists(self.request.session.session_key):
        #    self.request.session.create()
        
        # Serializer instance
        serializer = self.serializer_class(data=request.data) 

        data = {}    # Data to be returned to the user
        

        if serializer.is_valid():
            new_cust = serializer.save()
            data['success'] = 'True'
            data['email'] = new_cust.email
            data['name'] = new_cust.name
            data['phone'] = new_cust.phone

        else: 
            data = serializer.errors
        
        return Response(data)

class AllCustomerView(APIView):
    ''' View to get the data of all the customers in our database '''

    # Define class variables 
    serializer_class = CustomerSerializer
    queryset = []

    def get(self, request):

        ''' GET Request Handler: Display all the customers queried by the user ID '''
        
        # Collect the id for the store to be displayed
        user_id = request.GET.get('id')

        if user_id:
            queryset = Customer.get_cutomer(user_id)
        
        else:
            queryset = Customer.objects.all()
        
        
        return Response(CustomerSerializer(queryset, many = True).data)

class SlotView(APIView):
    ''' View to get the data of all the slots in our database '''

    # Define class variables 
    serializer_class = SlotSerializer
    queryset = []

    def get(self, request):

        ''' GET Request Handler: Display all the slots queried by the user ID and the store ID '''
        
        # Collect the id for the store to be displayed
        store_id = request.GET.get('store')

        queryset = Slot.get_slots(store_id=store_id)
        
        
        return Response(SlotSerializer(queryset, many = True).data)

class AddSlotView(APIView):
    
    ''' Class to select the slot for our user '''

    # Class variables 
    queryset = []

    def post(self, request):

        ''' POST request to handle the slot query if the slots are being booked by a customer '''

        # Get the data from the slot 
        user_id = request.data['user']
        slot_id = request.data['slot']
        
        # Get the slot details based on the slot id
        slot_details = Slot.objects.get(id=slot_id)
        user_details = Customer.objects.get(id=user_id)

        # total people update
        current_number = slot_details.total_people
        current_number += 1

        qs = Slot.objects.filter(id=slot_id)
        qs.update(total_people=current_number)

        # Add the store in the user stores
        queryset = Customer.objects.filter(stores__id=slot_details.store.id)
        print("STORE ID exists")
        
        if not queryset:
            user_details.stores.add(Store.objects.get(id=slot_details.store.id))
        else: 
            return Response({
            "error": "User has already booked a slot"
        })
        
        # Value to be returned 
        data = {}
        data['success'] = True
        data['user'] = user_id
        data['slot'] = slot_id
        return Response(data)

class OwnerView(APIView):

    ''' View to get the data of all the owners in our database '''

    # Define class variables 
    serializer_class = OwnerSerializer
    queryset = []

    def get(self, request): 
        
        ''' GET Request Handle: Display details of all the owners and the details of owner queried by ID ''' 
        
        # Collect id for the owner 
        owner_id = request.GET.get('id')    
        queryset = Owner.objects.all()

        if owner_id:
            queryset = queryset.filter(id=owner_id)
        
        return Response(OwnerSerializer(queryset, many=True).data)

class PlaceOrderView(APIView):
    
    ''' View to place order from the cart '''

    # Class variables 
    queryset = []

    def post(self, request):

        ''' POST request to handle the slot query if the slots are being booked by a customer '''

        # Get the data from the slot 
        user_id = request.data['user']
        cartprods = request.data['cartprods']
        
        # Get the slot details based on the slot id
        queryset = CartProduct.objects.filter(id__in=cartprods)

        # update value 
        queryset.update(ordered=True)

        # Value to be returned 
        data = {}
        data['success'] = True
        data['user'] = user_id
        data['cartprods'] = cartprods
        return Response(data)

