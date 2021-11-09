from enum import unique
from Cookbook import db

# adding images still needs to be workshopped

# The database
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    english_name = db.Column(db.String, unique = True, nullable = False)
    hindi_name_latin = db.Column(db.String, nullable = False, unique = True)
    hindi_name_devnagari = db.Column(db.Text, unique = True)

class Contributor(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    bio = db.Column(db.String)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    #header_image = db.Column(db.Blob(), nullable = False)
    prep_time = db.Column(db.Integer, nullable = False)
    description = db.Column(db.Text, nullable = False)
    difficulty = db.Column(db.Integer, nullable = False)
    #contributor_id = db.Column(db.Integer, db.ForeignKey("Contributor.id"), nullable = False)
    contributor_id = db.Column(db.Integer, nullable = False)
    vegetarian = db.Column(db.Boolean, nullable = False)
    quantity = db.Column(db.Float, nullable = False)
    unit = db.Column(db.String, nullable = False)

class Recipe_Steps(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    #recipe_id = db.Column(db.Integer, db.ForeignKey("Recipe.id"), nullable = False)
    recipe_id = db.Column(db.Integer, nullable = False)
    serial_number = db.Column(db.Integer, nullable = False)
    instruction = db.Column(db.String, nullable = False)

class Recipe_Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    #recipe_id = db.Column(db.Integer, db.ForeignKey("Recipe.id"), nullable = False)
    recipe_id = db.Column(db.Integer, nullable = False)
    ingredient_id = db.Column(db.Integer, nullable = False)
    quantity = db.Column(db.Float, nullable = False)
    unit = db.Column(db.String, nullable = False)

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    #header_image = db.Column(db.LargeBinary, nullable = False)
    description = db.Column(db.String, nullable = False)
    difficulty = db.Column(db.String, nullable = False)
    #contributor_id = db.Column(db.Integer, db.ForeignKey("Contributor.id"), nullable = False)
    contributor_id = db.Column(db.Integer, nullable = False)

class Skill_Steps(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    #recipe_id = db.Column(db.Integer, db.ForeignKey("Skill.id"), nullable = False)
    recipe_id = db.Column(db.Integer, nullable = False)
    serial_number = db.Column(db.Integer, nullable = False)
    instruction = db.Column(db.String, nullable = False)

class Tags(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    #recipe_id = db.Column(db.Integer, db.ForeignKey("Recipe.id"), nullable = False)
    recipe_id = db.Column(db.Integer, nullable = False)
    name = db.Column(db.String, nullable = False)

# functions
def addFullRecipe(newRecipeFull):
    # adding the contributor (if it doesn't exist already)
    contributor = Contributor.query.filter_by(name = newRecipeFull["contributor_name"]).first()
    if contributor is None:
        contributor = Contributor(**{
            "name": newRecipeFull["contributor_name"]
        })
        db.session.add(contributor)
        db.session.commit()

    # adding the base recipe to Recipe
    newRecipe = Recipe(**{
        "name": newRecipeFull["name"],
        "prep_time": newRecipeFull["prep_time"],
        "description": newRecipeFull["description"],
        "difficulty": newRecipeFull["difficulty"],
        "contributor_id": contributor.id,
        "vegetarian": newRecipeFull["vegetarian"],
        "quantity": newRecipeFull["quantity"],
        "unit": newRecipeFull["unit"]
    })
    db.session.add(newRecipe)
    db.session.commit()

    # adding all the steps
    for step in newRecipeFull["recipe_steps"]:
        db.session.add(Recipe_Steps(**{
            "recipe_id": newRecipe.id,
            "serial_number": step["serial_number"],
            "instruction": step["instruction"]
        }))
    db.session.commit()

    # adding all the tags
    for tag in newRecipeFull["recipe_tags"]:
        db.session.add(Tags(**{
            "recipe_id": newRecipe.id,
            "name": tag["name"]
        }))
    db.session.commit()

    # add all the ingredients (if they don't exist already)
    for ingredient in newRecipeFull["recipe_ingredients"]:
        newIngredient = Ingredient.query.filter_by(english_name = ingredient["english_name"]).first()
        if newIngredient is None:
            newIngredient = Ingredient(**{
                "english_name": ingredient["english_name"],
                "hindi_name_latin": ingredient["hindi_name_latin"],
                "hindi_name_devnagari": ingredient["hindi_name_devnagari"]
            })
            db.session.add(newIngredient)
            db.session.commit()

        # adding to the recipe_ingredients table
        db.session.add(Recipe_Ingredients(**{
                "recipe_id": newRecipe.id,
                "ingredient_id": newIngredient.id,
                "quantity": ingredient["quantity"],
                "unit": ingredient["unit"]
        }))
    db.session.commit()

def getFullRecipe(recipeById): # takes a 'Cookbook.Recipe' type of object, returned by a query and returns a recipe
    # What we need to do: get all info about the recipe(contributor, tags, ingredients and steps) and then compile it all to return it

    # get the contributor
    contributorName = Contributor.query.filter_by(id = recipeById.contributor_id).first().name

    # get all the tags
    recipeTags = [{
            "name": tag.name
        } for tag in Tags.query.filter_by(recipe_id = recipeById.id)]

    # get all the ingredients
    recipeIngredients = []
    for recipe_ingredient in Recipe_Ingredients.query.filter_by(recipe_id = recipeById.id):
        ingredient = Ingredient.query.filter_by(id = recipe_ingredient.ingredient_id).first()
        recipeIngredients.append({
            "english_name": ingredient.english_name,
            "hindi_name_latin": ingredient.hindi_name_latin,
            "hindi_name_devnagari": ingredient.hindi_name_devnagari,
            "quantity": recipe_ingredient.quantity,
            "unit": recipe_ingredient.unit
        })

    # get all the steps
    recipeSteps = [{
            "serial_number": step.serial_number,
            "instruction": step.instruction
        } for step in Recipe_Steps.query.filter_by(recipe_id = recipeById.id)]

    # now, we compile everything we took before and then return it!
    return {
        "id": recipeById.id,
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

def getAllRecipes():
    return [getFullRecipe(recipe) for recipe in Recipe.query.all()]