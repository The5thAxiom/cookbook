import re
from flask_sqlalchemy import FSADeprecationWarning
from Cookbook import app, db
from flask import jsonify, request
from Cookbook import models
import pprint

# takes a 'Cookbook.models.Recipe' type of object, returned by a query
def getRecipe(recipeById):
    contributorName = models.Contributor.query.filter_by(id = recipeById.contributor_id).first().name
    tags = models.Tags.query.filter_by(recipe_id = recipeById.id)
    recipeTags = []
    for tag in tags:
        newTag = {
            "name": tag.name
        }
        recipeTags.append(newTag)
    ingredients = models.Recipe_Ingredients.query.filter_by(recipe_id = recipeById.id)
    recipeIngredients = []
    for ingredient in ingredients:
        ig = models.Ingredient.query.filter_by(id = ingredient.ingredient_id).first()
        newRecipeIngredient = {
            "english_name": ig.english_name,
            "hindi_name_latin": ig.hindi_name_latin,
            "hindi_name_devnagari": ig.hindi_name_devnagari,
            "quantity": ingredient.quantity,
            "unit": ingredient.unit
        }
        recipeIngredients.append(newRecipeIngredient)
    recipeSteps = []
    steps = models.Recipe_Steps.query.filter_by(recipe_id = recipeById.id)
    for step in steps:
        newRecipeStep = {
            "serial_number": step.serial_number,
            "instruction": step.instruction
        }
        recipeSteps.append(newRecipeStep)

    recipe = {
        "name": recipeById.name,
        "prep_time": recipeById.prep_time,
        "description": recipeById.description,
        "difficulty": recipeById.difficulty,
        "vegetarian": recipeById.vegetarian,
        "quantity": recipeById.quantity,
        "unit": recipeById.unit,
        "contributor_name": contributorName,
        "recipe_tags": recipeTags,
        "recipe_ingredients": recipeIngredients,
        "recipe_steps": recipeSteps
    }
    return recipe

@app.route('/')
def home():
    home = """
    <h1> The Home Page </h1>
    <a href = "/recipes">recipes</a><br>
    <a href = "/skills">skills</a><br>
    <a href = "/get-recipes">get-recipe</a><br>
    <a href = "/about">about</a>
    """
    return home

@app.route('/add-recipe', methods = ['POST'])
def addRecipe():
    if request.method == 'POST':
        newRecipeFull = request.get_json(force = True)
        print(newRecipeFull)
        contributor = {
            "name": newRecipeFull["contributor_name"]
        }
        contributorExists = False
        allContributors = models.Contributor.query.all()
        for i in allContributors:
            if contributor["name"] == i.name:
                contributorExists = True
                contributorId = i.id
        if not contributorExists:
            newContributor = models.Contributor(**contributor)
            db.session.add(newContributor)
            db.session.commit()
            contributorId = newContributor.id
        trues = ["True", "true", True]
        newRecipe = {
            "name": newRecipeFull["name"],
            "prep_time": newRecipeFull["prep_time"],
            "description": newRecipeFull["description"],
            "difficulty": newRecipeFull["difficulty"],
            "contributor_id": contributorId,
            "vegetarian": True if newRecipeFull["vegetarian"] in trues else False,
            "quantity": newRecipeFull["quantity"],
            "unit": newRecipeFull["unit"]
        }
        allRecipes = models.Recipe.query.all()
        recipeExists = False
        for i in allRecipes:
            if newRecipe["name"] == i.name:
                recipeExists = True
        if recipeExists:
            return "recipe already exists"
        newRecipe = models.Recipe(**newRecipe)
        db.session.add(newRecipe)
        db.session.commit()
        newRecipeId = newRecipe.id
        for step in newRecipeFull["recipe_steps"]:
            newRecipeStep = {
                "recipe_id": newRecipeId,
                "serial_number": step["serial_number"],
                "instruction": step["instruction"]
            }
            print(newRecipeStep)
            db.session.add(models.Recipe_Steps(**newRecipeStep))
        for tag in newRecipeFull["recipe_tags"]:
            newTag = {
                "recipe_id": newRecipeId,
                "name": tag["name"]
            }
            db.session.add(models.Tags(**newTag))
        for ingredient in newRecipeFull["recipe_ingredients"]:
            newIngredient = {
                "english_name": ingredient["english_name"],
                "hindi_name_latin": ingredient["hindi_name_latin"],
                "hindi_name_devnagari": ingredient["hindi_name_devnagari"]
            }
            allIngredients = models.Ingredient.query.all()
            ingredientExists = False
            for i in allIngredients:
                if newIngredient["english_name"] == i.english_name:
                    ingredientExists = True
                    newRecipeIngredient = {
                        "recipe_id": newRecipeId,
                        "ingredient_id": i.id,
                        "quantity": ingredient["quantity"],
                        "unit": ingredient["unit"]
                    }
                    db.session.add(models.Recipe_Ingredients(**newRecipeIngredient))
            if not ingredientExists:
                newIngredient = models.Ingredient(**newIngredient)
                db.session.add(newIngredient)
                db.session.commit()
                ingredientId = newIngredient.id
                # recipe_ingredient:
                newRecipeIngredient = {
                    "recipe_id": newRecipeId,
                    "ingredient_id": ingredientId,
                    "quantity": ingredient["quantity"],
                    "unit": ingredient["unit"]
                }
                db.session.add(models.Recipe_Ingredients(**newRecipeIngredient))
        db.session.commit()
        return "success"
    else:
        return "error"

@app.route('/recipes')
def recipes():
    return "<h1>The recipes Page!!!</h1>"

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe/all')
def allRecipe():
    allRecipes = []
    recipeIds = models.Recipe.query.all()
    for r in recipeIds:
        allRecipes.append(getRecipe(r))
    return jsonify(allRecipes)

@app.route('/recipe/<int:num>')
def recipe(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        recipe = getRecipe(recipeById)
        return jsonify(recipe)
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