from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Category

''' Store App Views '''

# Home page view
def index(request):

    # retreive all categories
    categories = Category.get_all_categories()
    # retreive all the product data
    products = None

    # Get categoryID for filtering from the page
    category_id = request.GET.get('category')
    if category_id:
        products = Product.get_all_products_by_category(category_id)
    else:
        products = Product.get_all_products()


    # Data dictionary that needs to be passed as data for rendering
    data = dict()
    data['products'] = products
    data['categories'] = categories


    # Render the index page and pass the data to it
    return render(request, 'index.html', data)
