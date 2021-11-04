from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy

# creating the flask app
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classroom.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # we don't need real time updates as this is a REST based api

# db = SQLAlchemy(app)


# the controller has the 'brains' of the app, so we run (import) that here
from Cookbook import controllers

# # this will initialize the student table
# from classroom.models import Student
# db.create_all()