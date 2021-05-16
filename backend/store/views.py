from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product, Category, Customer
from django.contrib.auth.hashers import make_password, check_password
from django.views import View

''' Store App Views '''


''' Class to serve the home page '''
class Index(View):

    ''' Function to handle get request and render home page '''
    def get(self, request):

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

    ''' Function to handle POST Request '''
    def post(self, request):
        product = request.POST.get('product')

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


''' Create a class based view for the login endpoint'''
class Login(View):

    ''' Function to handle a get request '''
    def get(self, request):
        return render(request, 'login.html')

    ''' Function to handle a POST request '''
    def post(self, request):

        # Read the data that was enterred
        email = request.POST.get('user-email')
        password = request.POST.get('user-password')

        # Filter the user records with the email and retreieve password
        customer = Customer.get_customer_by_email(email)

        # Save the values in a value dictionary
        values = {
            'email': email,
        }

        error_message = None
        if customer:
            if check_password(password, customer.password):

                # Save the customer details in the session
                request.session['customer_id'] = customer.id
                request.session['email'] = customer.email

                # redirect to home page
                return redirect('homepage')
            else:
                error_message = "Email or password invalid"
        else:
            error_message = "Email or password invalid"

        # Render login page with the error
        data = {
            'error': error_message,
            'values': values
        }
        return render(request, 'login.html', data)
