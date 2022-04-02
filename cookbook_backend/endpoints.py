from urllib import response
from cookbook_backend import app
from flask import jsonify, request, abort, Response
from cookbook_backend import models
from cookbook_backend.controllers import *
from cookbook_backend import app

@app.route('/api/recipes', methods = ['GET', 'POST'])
def recipes():
    if request.method == 'POST':
        newRecipeFull = request.get_json(force = True)
        if models.Recipe.query.filter_by(name = newRecipeFull["name"]).first() is None:
            response = Response(status=202)
        else:
            addFullRecipe(newRecipeFull)
            response = Response(status=201)
    elif request.method == 'GET':
        response = jsonify({"data": "coming soon"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/<int:num>')
@app.route('/api/recipes/<int:num>/')
def recipes_n(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        response = jsonify(getRecipeMeta(r))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/<int:num>/tags')
def recipes_n_tags(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        response = jsonify({
            "name": r.name,
            "recipe_tags": getRecipeTags(r)
        })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/<int:num>/ingredients')
def recipes_n_ingredients(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        response = jsonify({
            "name": r.name,
            "recipe_ingredients": getRecipeIngredients(r)
        })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/<int:num>/steps')
def recipes_n_steps(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        response = jsonify({
            "name": r.name,
            "recipe_steps": getRecipeSteps(r)
        })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/<int:num>/full')
def recipes_n_full(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        response = jsonify(getFullRecipe(r))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/recipes/all')
def recipes_all():
    response = jsonify(getAllRecipes())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# @app.route('/api/skills/all')
# def api_allSkills():
#     response = jsonify(getAllSkills())
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/api/skills/<int:num>')
# def api_skill(num):
#     recipe = getSkillDictionary(getSkillById(num))
#     if recipe is None:
#         abort(404)
#     else:
#         response = jsonify(recipe)
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response