from django.shortcuts import render
from django.http import HttpResponse
from .models import Product

''' Store App Views '''

# Home page view
def index(request):

    # retreive all the product data
    products = Product.get_all_products()
    print(products)

    # Render the index page and pass the data to it
    return render(request, 'index.html', {'products' : products})
