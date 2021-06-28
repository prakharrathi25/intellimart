from django.db import models
from django.db.models.base import Model, ModelState
from django.db.models.deletion import CASCADE
from django.db.models import Q, query
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.postgres.fields import ArrayField
from django.http.response import StreamingHttpResponse

# Custom modules 
from .utils import search_filter_by_text

# Create your models here.

''' Store Owner Class '''
class Owner(models.Model):
    
    # Define the fields for the Customer
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15, default="12345678")
    email = models.EmailField()
    password = models.CharField(max_length=500)

    # Override the to string method for the class
    def __str__(self):
        return f"{self.name}"


''' Store Model'''
class Store(models.Model):
    """Model for the market which will hold all our stores and products

    Args:
        models: Inherits the model class 
    """

    # Override the to string method for the class
    def __str__(self):
        return f"{self.name}"

    # Define the fields of the market class 
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=1000, default="", null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, default=" ", blank=True)
    logo = models.ImageField(upload_to='uploads/images/logos')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, default=1) 
    phone_number = models.CharField(max_length=15, default="123456789")
    
    ''' Filter functions for the store model '''

    # Create a static method to return all stores in the database 
    @staticmethod
    def get_all_stores():

        # Return all products
        return Store.objects.all()
    
    # Create a static method to return the store based on an ID 
    @staticmethod
    def get_store_by_id(store_id):

        # Return the store details by a particular ID 
        return Store.objects.filter(id=store_id)

'''Category Model to store the details of categories to which products belong'''
class Category(models.Model):

    # Define the fields of the category model
    name = models.CharField(max_length=50)

    # Override the to string method for the class
    def __str__(self):
        return f"{self.name}"

    # Define plural name using meta class
    class Meta:
        verbose_name_plural = "categories"

    # Create a method to get all categories
    @staticmethod
    def get_all_categories():
        return Category.objects.all()

'''Product model to store the details of all the products'''
class Product(models.Model):

    # Define the fields of the product model
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    description = models.CharField(max_length=200, default='', null=True, blank=True)
    image = models.ImageField(upload_to='uploads/images/products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)    # Foriegn key with Category Model
    store = models.ForeignKey(Store, on_delete=models.CASCADE, default=1)
    unit = models.CharField(max_length=20, default="kg")
    
    # Override the to string method for the class
    def __str__(self):
        return f"{self.name}"

    ''' Filter functions for the product model '''

    # Create a static method to retrieve all products from the database
    @staticmethod
    def get_all_products():

        # Return all products
        return Product.objects.all()

    # Function to combine the search filters together 
    @staticmethod 
    def get_products(store_id=None, category_id=None, search_query=None):

        queryset = Product.get_all_products()
        
        # Apply filters to the data
        if store_id:
            queryset = queryset.filter(store=store_id)
        
        if category_id:
            queryset = queryset.filter(category=category_id)
        
        if search_query: 
            
            # Combine queries 
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            ) 
        return queryset

     # Filter the data by store ID:
    @staticmethod
    def get_all_products_by_store(store_id):

        # Check if store ID was passed
        if store_id:
            return Product.objects.filter(store=store_id)

    # Filter the data by category # ID:
    @staticmethod
    def get_all_products_by_category(category_id):

        # Check if category ID was passed
        if category_id:
            return Product.objects.filter(category=category_id)

''' Customer model to save the details of the user '''
class Customer(models.Model):

    # Define the fields for the Customer
    name = models.CharField(max_length=100, default="")
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    password = models.CharField(max_length=500)
    stores = models.ManyToManyField(
        'Store',
        related_name='customers'
    )    # list of stores the customer has been to

    # Override the to string method for the class
    def __str__(self):
        return f"{self.name}"

    ''' Function to get customers by various filtering methods '''
    @staticmethod
    def get_customer_by_email(email):
        try:
            return Customer.objects.get(email = email)

        except:
            return False

    @staticmethod
    def get_cutomer(user_id=None):
        try: 
            return Customer.objects.filter(id=user_id)
        
        except: 
            return False

    ''' Function to register the data in the database '''
    def register(self):
        self.save()

    ''' Function to set password to the given value '''
    def set_password(self, password):
        
        # Hash the password
        password = make_password(password)
        self.password = password

    ''' Check whether the user already exists in the database '''
    def is_exists(self):
        if Customer.objects.filter(email=self.email):
            return True
        else:
            return False

    ''' Function to validate custmer details '''
    def validate_customer(self):

        # Data validation
        error_message = None

        if not self.first_name:
            error_message = "First Name Required!"
        elif len(self.first_name) < 4:
            error_message = "Firstname length should be greater than 4"
        elif self.is_exists():
            error_message = "Email Address is already registered"

        return error_message

''' Cart Product Model for the details of the  '''
class CartProduct(models.Model):

    # Define the model fields 
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    ordered = models.BooleanField(default=False)

    ''' Functions to filter the cart products by various fields '''
    @staticmethod
    def get_cart_product(product_id=None, user_id=None, is_ordered=None):

        queryset = CartProduct.objects.all()
        
        # Apply filters to the data        
        if product_id:
            queryset = queryset.filter(product=product_id)
        
        if user_id:
            queryset = queryset.filter(user=user_id)
        
        if is_ordered:
            queryset = queryset.filter(ordered=is_ordered)
        
        return queryset

''' Model for the slots that each store provides '''
class Slot(models.Model):

    # Define the fields
    start_hour = models.IntegerField(default=0)
    end_hour = models.IntegerField(default=23)
    total_people = models.IntegerField(default=0)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    alloted = models.BooleanField(default=False)

    ''' Functions to filter slots by user and store ''' 
    @staticmethod
    def get_slots(store_id=None):

        try: 
            queryset = Slot.objects.all()

            if store_id:
                queryset = queryset.filter(store=store_id)

            return queryset
        
        except: 
            return False