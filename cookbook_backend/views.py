from cookbook_backend import app, db
from flask import jsonify, request, render_template
from cookbook_backend import models
from cookbook_backend.controllers import *

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/recipes')
def recipes():
    return render_template("recipes.html", **{
        "userName": "Samridh",
        "allRecipes": models.getAllRecipes()
    })

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe/<int:num>')
def recipe(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        if recipeById.difficulty <= 1:
            diff = "very easy"
        elif recipeById.difficulty == 2:
            diff = "easy"
        elif recipeById.difficulty == 3:
            diff = "fairly simple"
        elif recipeById.difficulty == 4:
            diff = "a bit tricky"
        elif recipeById.difficulty >= 5:
            diff = "quite tricky"
        else:
            diff = "fun"
        return render_template("individualRecipe.html", **{
            "diff": diff,
            "recipe": getRecipeDictionary(recipeById)
        })
    else:
        return "invalid id"

@app.route('/skill/<int:num>')
def skill():
    return "<h1>An individual skill Page!!!</h1>"

@app.route('/what-can-i-make')
def getRecipes():
    return render_template("what-can-i-make.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/daya')
def daya():
    return "Kuch to gadbad hai..."