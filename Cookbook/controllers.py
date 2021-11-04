from Cookbook import app
from flask import jsonify, request

@app.route('/')
def home():
    home = """
    <h1> The Home Page </h1>
    <a href = "/recipes">recipes</a><br>
    <a href = "/skills">skills</a><br>
    <a href = "/recipe">recipe</a><br>
    <a href = "/skill">skill</a><br>
    <a href = "/get-recipes">get-recipe</a><br>
    <a href = "/about">about</a>
    """
    return home

@app.route('/recipes')
def recipes():
    return "<h1>The recipes Page!!!</h1>"

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe')
def recipe():
    return "<h1>An individual recipe Page!!!</h1>"

@app.route('/skill')
def skill():
    return "<h1>An individual skill Page!!!</h1>"

@app.route('/get-recipes')
def getRecipes():
    return "<h1>The What can I get Page!!!</h1>"

@app.route('/about')
def about():
    return "<h1>The about Page!!!</h1>"