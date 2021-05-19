from django.db.models import query
from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
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
        # Get the full query set
        # queryset = Product.get_all_products()
        
        # # Apply filters to the data
        # if store_id:
        #     queryset = queryset.filter(store=store_id)
        
        # if category:
        #     queryset = queryset.filter(category=category)
        
        # if search_query: 
        #     names = queryset.filter(name__icontains=search_query)
        #     descriptions = queryset.filter(description__icontains=search_query)

        #     # Iterate through the names and get all ids 
        #     ids = []
        #     for i in range(len(names)):
        #         ids.append(names[i].id)
        #         print(type(names[i].id), print(type(names[i])))
            
        #     # iterate through descriptions 
        #     for i in range(len(descriptions)): 
        #         if descriptions[i].id not in ids:
        #             ids.append(descriptions[i].id)
            
        #     queryset = Product.objects.filter(id__in=ids)
        
        return Response(ProductSerializer(queryset, many = True).data)
        

class RegisterCustomer(APIView):

    ''' View to Register a customer into our database '''

    # Define class variables 
    serializer_class = RegisterCustomerSerializer

    # # This is where I get the error 
    # def get(self, request):
    #     if request.method == 'GET':
    #         return HttpResponse("Hello")

    # Function to handle post request
    def post(self, request, format=None):
        
        ''' Session handling for our users '''
        
        # Check if their is an existing session
        if not self.request.session.exists(self.request.session.session_key):
           self.request.session.create()

        serializer = self.serializer_class(data=request.data) 
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

        # Method 2 
        data = {}
        if serializer.is_valid():
            new_cust = serializer.save()
            data['response'] = "successfully registered a new user"
            data['email'] = new_cust.email
            data['first_name'] = new_cust.first_name
            data['last_name'] = new_cust.last_name
            data['phone'] = new_cust.phone

        else: 
            data = serializer.errors
        
        return Response(data)

