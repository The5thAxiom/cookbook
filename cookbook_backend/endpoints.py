from urllib import response
from cookbook_backend import app
from flask import jsonify, request, abort, Response
from cookbook_backend import models
from cookbook_backend.controllers import *
from cookbook_backend import app

@app.route('/api/add-recipe', methods = ['POST'])
def addRecipe():
    newRecipeFull = request.get_json(force = True)
    if models.Recipe.query.filter_by(name = newRecipeFull["name"]).first() is None:
        response = Response(status=202)
    else:
        addFullRecipe(newRecipeFull)
        response = Response(status=201)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/skill/all')
def api_allSkills():
    response = jsonify(getAllSkills())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/skill/<int:num>')
def api_skill(num):
    recipe = getSkillDictionary(getSkillById(num))
    found = False if recipe is None else True
    response = jsonify({"found": found, "skill": recipe})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipe/all')
def api_allRecipe():
    response = jsonify(getAllRecipes())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipe/<int:num>')
def api_recipe(num):
    recipe = getRecipeDictionary(getRecipeById(num))
    found = False if recipe is None else True
    response = jsonify({"found": found, "recipe": recipe})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# add a route like: /api/recipe to return metadata (number, etc)