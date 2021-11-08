from Cookbook import app, db
from flask import jsonify, request, render_template
from Cookbook import models

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/add-recipe', methods = ['GET', 'POST'])
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
        tags = []
        for tag in models.Tags.query.all():
            tags.append({
                "id": tag.id,
                "name": tag.name
                })
        contributors = []
        for c in models.Contributor.query.all():
            contributors.append({
                "id": c.id,
                "name": c.name
            })
        ingredients = []
        for i in models.Ingredient.query.all():
            ingredients.append({
                "id": i.id,
                "english_name": i.english_name,
                "hindi_name_latin": i.hindi_name_latin,
                "hindi_name_devnagari": i.hindi_name_devnagari
            })
        context = {
            "existing_tags": tags,
            "existing_contributors": contributors,
            "existing_ingredients": ingredients
        }
        return render_template("add-recipe.html", **context)

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
    return recipe(request.args.get("id"))

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
        context = {
            "diff": diff,
            "recipe": models.getFullRecipe(recipeById)
        }
        return render_template("individualRecipe.html", **context)
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

# routes which only return JSON
# This MIGHT be useful for the React front-end

@app.route('/API')
def API():
    return "API page"

@app.route('/API/add-recipe', methods = ['GET', 'POST'])
def API_addRecipe():
    if request.method == 'POST':
        # get the new recipe from the POST request
        newRecipeFull = request.get_json(force = True)

        # we don't need to do anything if the recipe exists already
        if models.Recipe.query.filter_by(name = newRecipeFull["name"]).first() is not None:
            return "recipe exists already"

        models.addFullRecipe(newRecipeFull)
        return "success"
    else:
        return "recipe form here"

@app.route('/API/recipes')
def API_recipes():
    return "recipes here"

@app.route('/API/skills')
def API_skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/API/recipe/all')
def API_allRecipe():
    return jsonify(models.getAllRecipes())

@app.route('/API/recipe/<int:num>')
def API_recipe(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        return jsonify({"found": True, "recipe": models.getFullRecipe(recipeById)})
    else:
        return jsonify({"found": False})

@app.route('/API/recipe', methods = ['GET'])
def API_recipeGET():
    id = request.args.get("id")
    print("id:", id, type(id))
    if id == '0':
        return jsonify(models.getAllRecipes())
    else:
        return API_recipe(request.args.get("id"))