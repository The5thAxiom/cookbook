from Cookbook import app, db
from flask import jsonify, request, render_template
from Cookbook import models

@app.route('/')
def index():
    index = """
    <h1> The Home Page </h1>
    <a href = "/recipes">recipes</a><br>
    <a href = "/skills">skills</a><br>
    <a href = "/get-recipes">get-recipe</a><br>
    <a href = "/about">about</a>
    """
    return index

@app.route('/add-recipe', methods = ['POST'])
def addRecipe():
    if request.method == 'POST':
        # get the new recipe from the POST request
        newRecipeFull = request.get_json(force = True)

        # we don't need to do anything if the recipe exists already
        if models.Recipe.query.filter_by(name = newRecipeFull["name"]).first() is not None:
            return "recipe exists already"

        models.addFullRecipe(newRecipeFull)
        return "success"
    else:
        return "error: post karo na kuch, ye get ka kya karu mai"

@app.route('/recipes')
def recipes():
    return "<h1>The recipes Page!!!</h1><a href = '/recipe/1'>1</a><br><a href = '/recipe/2'>2</a><br><a href = '/recipe/all'>all</a>"

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe/all')
def allRecipe():
    allRecipes = []
    for recipe in models.Recipe.query.all():
        allRecipes.append(models.getFullRecipe(recipe))
    return jsonify(allRecipes)

@app.route('/recipe')
def recipeGET():
    num = request.args.get("id")
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        return jsonify(models.getFullRecipe(recipeById))
    else:
        return "invalid id"

@app.route('/recipe/<int:num>')
def recipe(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        return jsonify(models.getFullRecipe(recipeById))
    else:
        return "invalid id"

@app.route('/skill')
def skill():
    return "<h1>An individual skill Page!!!</h1>"

@app.route('/get-recipes')
def getRecipes():
    return "<h1>The What can I get Page!!!</h1>"

@app.route('/about')
def about():
    return "<h1>The about Page!!!</h1>"

@app.route('/daya')
def daya():
    return "Kuch to gadbad hai..."