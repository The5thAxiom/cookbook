from datetime import timedelta
import os

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# creating the flask app
app = Flask(
    __name__,
    static_folder='../frontend/build',
    static_url_path='/'
)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Cookbook.db'
app.config['SQLALCHEMY_DATABASE_URI'] = f"{os.environ.get('DB_URL')}"
# we don't need real time updates as this is a REST based api
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

# this will initialize the tables
from backend.models import *

# this needs to be called once from the shell, not everytime :facepalm:
# db.create_all()

from backend.controllers import *
from backend.endpoints import *


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api')
def documentation():
    return render_template('documentation.html')

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')
