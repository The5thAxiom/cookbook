from flask import jsonify, request, abort, Response

from backend import app
from backend.models import Recipe
from backend.controllers import *
from backend import app


@app.route('/api/recipes', methods=['GET', 'POST'])
def recipes():
    if request.method == 'POST':
        newRecipeFull = request.get_json(force=True)
        if Recipe.query.filter_by(name=newRecipeFull["name"]).first() is not None:
            return Response(status=202)
        else:
            addFullRecipe(newRecipeFull)
            return Response(status=201)
    elif request.method == 'GET':
        return jsonify({"data": "coming soon"})


@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        addNewUser(request.get_json(force=True))
        return Response(status=201)
    else:
        return jsonify([user.to_dict() for user in User.query.all()])


@app.route('/api/users/<int:num>')
def users_n(num):
    user = User.query.get(num)
    if user is None:
        abort(404)
    else:
        return jsonify(user.to_dict())


@app.route('/api/recipes/<int:num>')
def recipes_n(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        return jsonify(getRecipeMeta(r))


@app.route('/api/recipes/<int:num>/tags')
def recipes_n_tags(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        return jsonify({
            "name": r.name,
            "recipe_tags": getRecipeTags(r)
        })


@app.route('/api/recipes/<int:num>/ingredients')
def recipes_n_ingredients(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        return jsonify({
            "name": r.name,
            "recipe_ingredients": getRecipeIngredients(r)
        })


@app.route('/api/recipes/<int:num>/steps')
def recipes_n_steps(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        return jsonify({
            "name": r.name,
            "recipe_steps": getRecipeSteps(r)
        })


@app.route('/api/recipes/<int:num>/full')
def recipes_n_full(num):
    r = getRecipeById(num)
    if r is None:
        abort(404)
    else:
        return jsonify(getFullRecipe(r))


@app.route('/api/recipes/count')
def recipes_count():
    return jsonify({"count": len(Recipe.query.all())})


@app.route('/api/recipes/all')
def recipes_all():
    return jsonify({
        "recipes": [
            getRecipeMeta(recipe)
            for recipe in Recipe.query.all()
        ]
    })

    # @app.route('/api/recipes/all/tags')
    # def recipes_all_tags():
    #     return jsonify({"recipes":
    #         list(map(getRecipeTags, Recipe.query.all()))
    #     })
    # @app.route('/api/recipes/all/ingredients')
    # def recipes_all_ingredients():
    #     return jsonify({"recipes":
    #         list(map(getRecipeIngredients, Recipe.query.all()))
    #     })
    # @app.route('/api/recipes/all/steps')
    # def recipes_all_steps():
    #     return jsonify({"recipes":
    #         list(map(getRecipeSteps, Recipe.query.all()))
    #     })
    # @app.route('/api/recipes/all/full')
    # def recipes_all_full():
    #     return jsonify({"recipes":
    #         list(map(getRecipeMeta, Recipe.query.all()))
    #     })
    # @app.route('/api/skills/all')
    # def api_allSkills():
    #     return jsonify(getAllSkills())
    # @app.route('/api/skills/<int:num>')
    # def api_skill(num):
    #     recipe = getSkillDictionary(getSkillById(num))
    #     if recipe is None:
    #         abort(404)
    #     else:
    #         return jsonify(recipe)
