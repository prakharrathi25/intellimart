from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product, Category, Customer
from django.contrib.auth.hashers import make_password, check_password

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
def signup(request):

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

        # Hash the password
        password = make_password(password)

        # Save the values in a value dictionary
        values = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone': phone
        }

        # Create an instance of the customer
        customer = Customer(first_name=first_name,
                            last_name=last_name,
                            phone=phone,
                            email=email,
                            password=password)

        # Perform data validation
        error_message = customer.validate_customer()

        # Save if there is no error
        if not error_message:

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


''' Function to login the user '''
def login(request):

    # Render the page for a get request
    if request.method == 'GET':
        return render(request, 'login.html')

    # Handle POST request
    else:

        # Read the data that was enterred
        email = request.POST.get('user-email')
        password = request.POST.get('user-password')

        # Filter the user records with the email and retreieve password
        customer = Customer.get_customer_by_email(email)

        error_message = None
        if customer:
            if check_password(password, customer.password):
                return redirect('homepage')
            else:
                error_message = "Email or password invalid"
        else:
            error_message = "Email or password invalid"

        # Render login page with the error
        return render(request, 'login.html', {'error':error_message})
