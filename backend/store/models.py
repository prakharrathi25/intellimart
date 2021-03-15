from django.db import models

# Create your models here.


# Category Model to store the details of categories to which products belong
class Category(models.Model):

	# Define the fields of the category model
	name = models.CharField(max_length=50)

	# Override the to string method for the class
	def __str__(self):
		return f"Category: {self.name}"

	# Define plural name using meta class
	class Meta:
		verbose_name_plural = "categories"

	# Create a method to get all categories
	@staticmethod
	def get_all_categories():
		return Category.objects.all()


# Product model to store the details of all the products
class Product(models.Model):

	# Define the fields of the product model
	name = models.CharField(max_length=100)
	price = models.IntegerField(default=0)
	quantity = models.IntegerField(default=0)
	description = models.CharField(max_length=200, default='', null=True, blank=True)
	image = models.ImageField(upload_to='uploads/images/products')
	category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)    # Foriegn key with Category Model

	''' Filter functions for the product model '''

	# Create a static method to retrieve all products from the database
	@staticmethod
	def get_all_products():

		# Return all products
		return Product.objects.all()

	# Filter the data by category # IDEA:
	@staticmethod
	def get_all_products_by_category(category_id):

		# Check if category ID was passed
		if category_id:
			return Product.objects.filter(category=category_id)

		# else:
		# 	# return all products
		# 	get_all_products()

''' Customer model to save the details of the user '''
class Customer(models.Model):

	# Define the fields for the Customer
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	phone = models.CharField(max_length=15)
	email = models.EmailField()
	password = models.CharField(max_length=500)

	''' Function to register the data in the database '''
	def register(self):
		self.save()
