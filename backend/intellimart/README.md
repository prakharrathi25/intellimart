## How to run the backend

Follow the steps below to get the backend up and running. 

Admin Usrname- admin

Pass - 1234 

- Setup Virtual environment

    `$ python3 -m venv env`

- Activate the virtual environment

    `$ source env/bin/activate`

- Install the dependencies needed for the project

    `$ pip install -r requirements.txt`

- Make migrations using

    `$ python manage.py makemigrations`

- Migrate the database

    `$ python manage.py migrate`

- Run the backend Server

    `$ python manage.py runserver`

## Apps

The Django project is divided into multiple apps. An app refers to a submodule of the project. It's self-sufficient and not intertwined with the other apps in the project. 

The **project’s root directory,** containing **`manage.py`** is the container for all of a project’s applications that aren’t installed separately. These applications help us separate the high-level functions of the project and maintain separate data and features for each application. A Django App contains multiple models, views and URLs. 

- **Model**

    A model is the single, definitive source of information about your data. It contains the essential fields and behaviours of the data you’re storing. Generally, each model maps to a single database table. They resemble how databases are used in other backend frameworks and contain databases in a relational structure format which are stored in an `sqlite` database which can be viewed from the admin page. 

    The basics:

    - Each model is a Python class that subclasses **`[django.db.models.Model](https://docs.djangoproject.com/en/3.1/ref/models/instances/#django.db.models.Model)`**.
    - Each attribute of the model represents a database field.

    The most important part of a model – and the only required part of a model – is the list of database fields it defines. Fields are specified by class attributes.


- **Views**

- **URLs**

- **Serializers**

## Project Structure 

This project has a single app backend as of now, given the current functionalities and the need for the queries. Keeping in mind the current structure, we have built a single `market` app which contains all our models and views.    

### Models

There are multiple models being used in this app which hold the data and interact with each other. 

The models in this project are:- 

`Products`: This model stores the data of all the products in our database. This model has the following fields:-

- `id`: ID of the product
- `name`: Name of the product 
- `price`: Price of the product
- `quantity`: Quantity of the product available in that store
- `description`: Description of the product in the store
- `image` : Image of the product in the store
- `category`: ID of the category to which the product belongs (Foreign Key)
- `store`: ID of the store to which the product belongs (Foreign Key)

`Category`: This model stores the categories of products and is used for filtering. 
This model has the following fields:-

- `id`: ID of the category 
- `name`: Name of the category 

`Stores`: This model keeps the information of all the stores in our database and can be edited and managed by the store owners. The model has the following fields:- 

- `name`: Name of the store
- `description`: Description of the store 
- `address`: Address of the store 
- `logo`: Logo of the store
- `owner`: ID of the owner of the store (foreign key)

`Owner`: This is the model which stores the details of the owners of the different stores. The owners first register themselves and then they can add the stores that they own. The owner model has the following fields:- 

- `name`: Name of the owner 
- `email`: Email Address of the owner 
- `phone`: Contact Number of the owner
- `password`: Hashed password of the owner

`Customer`: This model stores the details of the customers or the end-users of our application 

- `first_name`: First Name of the customer
- `last_name`: Last name of the customer 
- `email`: Email Address of the customer 
- `phone`: Contact Number of the customer
- `password`: Hashed password of the customer

### Views