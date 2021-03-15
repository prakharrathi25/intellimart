from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product, Category, Customer

''' Store App Views '''


''' Function to serve the home page '''
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

''' Function to serve the signup page '''
def sign_up(request):

    # Handle the request types
    if request.method == 'GET':

        # Render the signup page
        return render(request, 'signup.html')

    # Manage the data and send to the database
    else:

        # Collect the post data as a dictionary
        post_data = request.POST
        first_name = post_data.get('firstname')
        last_name = post_data.get('lastname')
        phone = post_data.get('phone-number')
        email = post_data.get('user-email')
        password = post_data.get('user-password')

        # Save the values in a value dictionary
        values = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone': phone
        }

        # Data Validation
        error_message = None
        if not first_name:
            error_message = "First Name Required!"
        elif len(first_name) < 4:
            error_message = "Firstname length should be greater than 4"

        if not error_message:

            # Create an instance of the customer
            customer = Customer(first_name=first_name,
                            	last_name=last_name,
                            	phone=phone,
                            	email=email,
                            	password=password)

            # Call the function to save the data
            customer.register()
            return redirect('homepage')

        else:

            # Create a data instance
            data = {
                'error': error_message,
                'values': values
            }
            return render(request, 'signup.html', data)
