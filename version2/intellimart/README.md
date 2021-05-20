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

This is a single app backend as of now, given the current functionalities and the need for the queries. Keeping in mind the current structure, we have built a single `market` app which contains all out models   

The **project’s root directory,** containing **`manage.py`** is the container for all of a project’s applications that aren’t installed separately. These applications help us separate the high-level functions of the project and maintain separate data and features for each application. A Django App contains multiple models, views and URLs. 

- **Model**

    A model is the single, definitive source of information about your data. It contains the essential fields and behaviours of the data you’re storing. Generally, each model maps to a single database table. They resemble how databases are used in other backend frameworks and contain databases in a relational structure format which are stored in an `sqlite` database which can be viewed from the admin page. 

    The basics:

    - Each model is a Python class that subclasses **`[django.db.models.Model](https://docs.djangoproject.com/en/3.1/ref/models/instances/#django.db.models.Model)`**.
    - Each attribute of the model represents a database field.

- **Views**

- **URLs**

- **Serializers**

The most important part of a model – and the only required part of a model – is the list of database fields it defines. Fields are specified by class attributes.

The applications that have been created in this project are: 

### Store App

This the most basic app we have built in the background. 

**Models and Migrations** 

There are multiple models being used in the store app which hold the data and interact with each other to share data. 

**Views**