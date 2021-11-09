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
        tags = [{
            "id": tag.id,
            "name": tag.name
        } for tag in models.Tags.query.all()]
        contributors = [{
            "id": c.id,
            "name": c.name
        } for c in models.Contributor.query.all()]
        ingredients = [{
            "id": i.id,
            "english_name": i.english_name,
            "hindi_name_latin": i.hindi_name_latin,
            "hindi_name_devnagari": i.hindi_name_devnagari
        } for i in models.Ingredient.query.all()]
        return render_template("add-recipe.html", **{
            "existing_tags": tags,
            "existing_contributors": contributors,
            "existing_ingredients": ingredients
        })

@app.route('/recipes')
def recipes():
    return render_template("recipes.html", **{
        "userName": "Samridh",
        "allRecipes": models.getAllRecipes()
    })

@app.route('/skills')
def skills():
    return "<h1>The skills Page!!!</h1>"

@app.route('/recipe/all')
def allRecipe():
    return jsonify(models.getAllRecipes())

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
            "recipe": models.getFullRecipe(recipeById)
        })
    else:
        return "invalid id"

@app.route('/skill')
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

# routes which only return JSON
# This MIGHT be useful for the React front-end

# the 'skill' routes currently return recipes
#   change this when you make the functions:
#       models.getAllSkills() and models.getFullSkill()
@app.route('/API/skill/all')
def API_allSkills():
    return jsonify(models.getAllRecipes())

@app.route('/API/skill/<int:num>')
def API_skills(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        return jsonify({
            "found": True,
            "recipe": models.getFullRecipe(recipeById)
        })
    else:
        return jsonify({"found": False})

# these routes work well (and ONLY return JSON)
@app.route('/API/recipe/all')
def API_allRecipe():
    return jsonify(models.getAllRecipes())

@app.route('/API/recipe/<int:num>')
def API_recipe(num):
    recipeById = models.Recipe.query.filter_by(id = num).first()
    if recipeById is not None:
        return jsonify({
            "found": True,
            "recipe": models.getFullRecipe(recipeById)
        })
    else:
        return jsonify({"found": False})