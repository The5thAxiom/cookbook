from datetime import timedelta
import os

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import\
    create_access_token,\
    get_jwt,\
    get_jwt_identity,\
    unset_jwt_cookies,\
    jwt_required,\
    JWTManager

# creating the flask app
app = Flask(
    __name__,
    static_folder='../frontend/build',
    static_url_path='/'
)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Cookbook.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # we don't need real time updates as this is a REST based api

db = SQLAlchemy(app)


# this will initialize the tables
from backend.models import *
db.create_all()

from backend.controllers import *
from backend.endpoints import *

@app.route('/')
def index():
    return app.send_static_file('index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')
