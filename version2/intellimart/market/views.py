from django.db.models import query
from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from django.http import HttpResponse
from itertools import chain

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
                                        search_query=search_query )

        return Response(ProductSerializer(queryset, many = True).data)

class CartProductView(generics.ListAPIView):
    
    ''' View to display cart items and add items to the cart '''

    # Define class variables 
    serializer_class = CartProductSerializer
    queryset = []

    def get(self, request):

        ''' Display all the cart items queried by different id paramters '''
        user_id = request.GET.get('user')
        cart_id = request.GET.get('cart')
        product_id = request.GET.get('product')

        queryset = CartProduct.get_cart_product(cart_id=cart_id, 
                                    product_id=product_id, 
                                    user_id=user_id)
        
        return Response(CartProductSerializer(queryset, many=True).data)

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
        
        # Method 2 

        # if serializer.is_valid():
            
        #     cust_data = serializer.data
            
        #     # Get the data
        #     first_name = cust_data.get('first_name')
        #     last_name = cust_data.get('last_name') 
        #     email = cust_data.get('email')
        #     phone = cust_data.get('phone')

        #     # get the passwords 
        #     password = request.POST.get('password')
        #     password2 = request.POST.get('password2') 

        #     # Create a new customer model object to save the data 
        #     new_customer_instance = Customer(
        #         first_name=first_name,
        #         last_name=last_name, 
        #         email=email, 
        #         phone=phone,
        #         password=password,
        #     )
        #     new_customer_instance.save()

        #     return Response(CustomerSerializer(new_customer_instance).data, status=status.HTTP_200_OK)
        
        # return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

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
    