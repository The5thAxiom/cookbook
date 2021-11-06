from Cookbook import app, db
from flask import jsonify, request, render_template
from Cookbook import models

@app.route('/')
def index():
    return render_template("index.html")

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
    context = {
        "userName": "Samridh",
        "allRecipes": models.getAllRecipes()
    }
    return render_template("recipes.html", **context)

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe/all')
def allRecipe():
    return jsonify(models.getAllRecipes())

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
        return render_template("individualRecipe.html", **models.getFullRecipe(recipeById))
        #return jsonify(models.getFullRecipe(recipeById))
    else:
        return "invalid id"

@app.route('/skill')
def skill():
    return "<h1>An individual skill Page!!!</h1>"

@app.route('/what-can-i-make')
def getRecipes():
    return "<h1>The What can I get Page!!!</h1>"

@app.route('/about')
def about():
    return "<h1>The about Page!!!</h1>"

@app.route('/daya')
def daya():
    return "Kuch to gadbad hai..."