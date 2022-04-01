from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# creating the flask app
app = Flask(__name__)

# creating the db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Cookbook.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # we don't need real time updates as this is a REST based api
db = SQLAlchemy(app)

# this will initialize the tables
from cookbook_backend.models import *
db.create_all()

# the controller has the 'brains' of the app, so we run (import) that here
from cookbook_backend.controllers import *
from cookbook_backend.views import *
from cookbook_backend.endpoints import *