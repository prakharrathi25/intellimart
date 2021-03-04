from django.db import models

# Create your models here.


# Product model to store the details of all the projects 
class Product(models.Model):

	# Define the fields of the product model 
	name = models.CharField(max_length=50)
	price = models.IntegerField(default=0)
	quantity = models.IntegerField(default=0)
	description = models.CharField(max_length=200, default='')
	image = models.ImageField(upload_to='products/images/')
	