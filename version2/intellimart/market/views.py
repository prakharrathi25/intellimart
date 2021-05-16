from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from .models import *
from .serializers import *

# Create your views here.

''' API Views to return the data to the frontend ''' 

class StoreView(generics.ListAPIView):
    """Store view which returns the store data as a Json file. 
    """

    # Define class variables 
    serializer_class = StoreSerializer

    # Manage a get request 
    def get(self, request):
        
        # Get storeid for filtering from the page
        store_id = request.GET.get('id')
       
        if store_id:
            queryset = Product.get_all_products_by_store(store_id)[0]
        else: 
            queryset = Product.get_all_products()[0]
            print("QUERYSET", queryset)
        
        return Response(ProductSerializer(queryset).data)
        #queryset = Store.objects.all()
        # serializer_class = StoreSerializer


''' View to Register a customer into our database '''
class RegisterCustomer(APIView):

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

