from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.

''' Store Owner Class '''
class Owner(models.Model):
    
    # Define the fields for the Customer
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    password = models.CharField(max_length=500)

    # Override the to string method for the class
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


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
    
    ''' Filter functions for the product model '''

    # Create a static method to retrieve all products from the database
    @staticmethod
    def get_all_products():

        # Return all products
        return Product.objects.all()

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
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    password = models.CharField(max_length=500)

    ''' Function to get customers by email '''
    @staticmethod
    def get_customer_by_email(email):
        try:
            return Customer.objects.get(email = email)

        except:
            return False

    ''' Function to register the data in the database '''
    def register(self):
        self.save()

    ''' Function to set password to the given value '''
    def set_password(self, password):
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
