from datetime import datetime, timedelta, timezone
import json


from flask import jsonify, request, abort, Response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import\
    create_access_token,\
    get_jwt,\
    get_jwt_identity,\
    unset_jwt_cookies,\
    jwt_required,\
    JWTManager

from backend import app, bcrypt
from backend.models import Recipe
from backend.controllers import *


@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        newUser = request.get_json(force=True)
        user = User.query.filter(User.username == newUser['username']).first()
        print(newUser)
        if user is None:
            addNewUser(newUser)
            return Response(status=201)
        else:
            return Response(status=201)
        
    else:
        return jsonify([user.to_dict() for user in User.query.all()])

@app.route('/api/users/login', methods=["POST"])
def user_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None).encode('utf-8')
    user = User.query.filter(User.username == username).first()
    if user is not None and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token})
    else:
        abort(401)


@app.route('/api/users/profile')
@jwt_required()
def user_profile():
    username = get_jwt_identity()
    return jsonify(User.query.filter(User.username == username).first().to_dict())

@app.route('/api/users/logout')
def user_logout():
    response = Response(status=202)
    unset_jwt_cookies(response)
    return response

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/api/users/<username>')
def users_str(username):
    user = User.query.filter(User.username == username).first()
    if user is None:
        abort(404)
    else:
        return jsonify(user.to_dict())

@app.route('/api/users/<username>/recipes')
def user_str_recipes(username):
    user = User.query.filter(User.username == username).first()
    if user is None:
        abort(404)
    else:
        return jsonify({
            "recipes": [
                getRecipeMeta(recipe)
                for recipe
                in Recipe.query.filter(
                    Recipe.contributor.has(
                        User.username == user.username
                    )
                )
            ]
        })


@app.route('/api/users/<username>/recipes/full')
def user_str_recipes_full(username):
    user = User.query.filter(User.username == username).first()
    if user is None:
        abort(404)
    else:
        return jsonify({
            "recipes": [
                getRecipeFull(recipe)
                for recipe
                in Recipe.query.filter(
                    Recipe.contributor.has(
                        User.username == user.username
                    )
                )
            ]
        })


@app.route('/api/recipes', methods=['POST'])
@jwt_required()
def recipes():
    newRecipeFull = request.get_json(force=True)
    if Recipe.query.filter_by(name=newRecipeFull["name"]).first() is not None:
        return Response(status=202)
    else:
        addFullRecipe(newRecipeFull)
        return Response(status=201)


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
        return jsonify(getRecipeFull(r))


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
