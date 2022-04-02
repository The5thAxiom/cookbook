from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# creating the flask app
app = Flask(__name__)

# creating the db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Cookbook.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # we don't need real time updates as this is a REST based api
db = SQLAlchemy(app)

# this will initialize the tables
from backend.models import *
db.create_all()

# the controller has the 'brains' of the app, so we run (import) that here
from backend.controllers import *
# from backend.views import *
from backend.endpoints import *