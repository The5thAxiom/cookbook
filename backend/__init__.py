from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# creating the flask app
app = Flask(__name__)
CORS(app)

# creating the db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Cookbook.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # we don't need real time updates as this is a REST based api
db = SQLAlchemy(app)

# this will initialize the tables
from backend.models import *
db.create_all()

from backend.controllers import *
from backend.endpoints import *