from flask_sqlalchemy import FSADeprecationWarning
from Cookbook import app
from flask import jsonify, request
from Cookbook import models
import pprint

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

@app.route('/add-recipe', methods = ['POST'])
def addRecipe():
    if request.method == 'POST':
        newRecipeFull = request.get_json(force = True)
        # this 'full' recipe needs to be broken up into the tables stored in the db
        #   recipe
        #   steps
        #   contributor
        #   recipe_ingredients and ingredient:
        #       if the ingredient is in the ingredient table, then add its id
        #       if not, then add it into the ingredient table and then add its id
        #       the id must be added to the recipe_ingredients table w/ the recipe id and stuff
        print("full recipe:")
        print(newRecipeFull)

        print("recipe:")
        newRecipe = {
            "name": newRecipeFull["name"],
            "prep_time": newRecipeFull["prep_time"],
            "description": newRecipeFull["description"],
            "difficulty": newRecipeFull["difficulty"],
            "vegetarian": newRecipeFull["vegetarian"],
            "quantity": newRecipeFull["quantity"],
            "unit": newRecipeFull["unit"]
        }
        print(newRecipe)
        # add the new recipe here
        newRecipeId = 0 # this must be the id of the recipe added above

        print("recipe steps:")
        for step in newRecipeFull["recipe_steps"]:
            newRecipeStep = {
                "recipe_id": newRecipeId,
                "serial_number": step["serial_number"],
                "instruction": step["instruction"]
            }
            print(newRecipeStep)
            # add the new recipe_step to the db here

        print("recipe tags:")
        for tag in newRecipeFull["recipe_tags"]:
            newTag = {
                "recipe_id": newRecipeId,
                "name": tag["name"]
            }
            print(newTag)
            # add the new recipe_tag here

        print("ingredients:")
        for ingredient in newRecipeFull["recipe_ingredients"]:
            newIngredient = {
                "english_name": ingredient["english_name"],
                "hindi_name_latin": ingredient["hindi_name_latin"],
                "hindi_name_devnagari": ingredient["hindi_name_devnagari"]
            }
            print(newIngredient)
            # add new Ingredient to the db
            #   if it exists: return the id
            #   if it doesn't: add new and return the id
            IngredientId = 0 # the id(int) returned from the above insertion
            newRecipeIngredient = {
                "recipe_id": newRecipeId,
                "ingredient_id": IngredientId,
                "quantity": ingredient["quantity"],
                "unit": ingredient["unit"]
            }
            print(newRecipeIngredient)
        
        print("contributor:")
        contributor = {
            "name": newRecipeFull["contributor_name"]
        }
        print(contributor)
        # add the contributor if it doesn't exist

        return "success"
    else:
        return "error"

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