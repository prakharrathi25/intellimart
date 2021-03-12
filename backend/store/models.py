from django.db import models

# Create your models here.


# Category Model to store the details of categories to which products belong
class Category(models.Model):

	# Override the to string method for the class
	def __str__(self):
		return f"Category: {self.name}"

	# Define plural name using meta class
	class Meta:
		verbose_name_plural = "categories"

	# Define the fields of the category model
	name = models.CharField(max_length=50)

# Product model to store the details of all the products
class Product(models.Model):

	# Define the fields of the product model
	name = models.CharField(max_length=100)
	price = models.IntegerField(default=0)
	quantity = models.IntegerField(default=0)
	description = models.CharField(max_length=200, default='', null=True, blank=True)
	image = models.ImageField(upload_to='uploads/images/products')
	category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)    # Foriegn key with Category Model


	# Create a static method to retrieve all products from the database
	@staticmethod
	def get_all_products():

		# Return all products
		return Product.objects.all()
