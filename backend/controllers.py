from backend import db, bcrypt
from backend.models import *

def addFullRecipe(newRecipeFull: str):
    newRecipe = Recipe(**{
        "name": newRecipeFull["name"],
        "prep_time": newRecipeFull["prep_time"],
        "description": newRecipeFull["description"],
        "difficulty": newRecipeFull["difficulty"],
        "contributor_id": newRecipeFull["contributor_id"],
        "vegetarian": newRecipeFull["vegetarian"],
        "quantity": newRecipeFull["quantity"],
        "unit": newRecipeFull["unit"]
    })
    db.session.add(newRecipe)
    db.session.commit()

    for step in newRecipeFull["recipe_steps"]:
        db.session.add(Recipe_Step(**{
            "recipe_id": newRecipe.id,
            "serial_number": step["serial_number"],
            "instruction": step["instruction"]
        }))
    db.session.commit()

    for tag in newRecipeFull["recipe_tags"]:
        db.session.add(Tag(**{
            "recipe_id": newRecipe.id,
            "name": tag["name"]
        }))
    db.session.commit()

    # add all the ingredients (if they don't exist already)
    for ingredient in newRecipeFull["recipe_ingredients"]:
        newIngredient = Ingredient.query.filter_by(
            english_name=ingredient["english_name"]).first()
        if newIngredient is None:
            newIngredient = Ingredient(**{
                "english_name": ingredient["english_name"],
                "hindi_name_latin": ingredient["hindi_name_latin"],
                "hindi_name_devnagari": ingredient["hindi_name_devnagari"]
            })
            db.session.add(newIngredient)
            db.session.commit()

        db.session.add(Recipe_Ingredient(**{
            "recipe_id": newRecipe.id,
            "ingredient_id": newIngredient.id,
            "quantity": ingredient["quantity"],
            "unit": ingredient["unit"]
        }))
    db.session.commit()


def addNewUser(newUser: dict):
    newUser['password'] = bcrypt.generate_password_hash(newUser['password'].encode('utf-8'))
    db.session.add(User(**newUser))
    db.session.commit()


def getRecipeById(id: int) -> Recipe:
    return Recipe.query.get(id)


def getRecipeMeta(recipeById: Recipe):
    return {
        "id": recipeById.id,
        "name": recipeById.name,
        "prep_time": recipeById.prep_time,
        "description": recipeById.description,
        "difficulty": recipeById.difficulty,
        "vegetarian": recipeById.vegetarian,
        "quantity": recipeById.quantity,
        "unit": recipeById.unit
    }


def getRecipeIngredients(recipe: Recipe):
    return [
        {
            "english_name": recipe_ingredient.ingredient.english_name,
            "hindi_name_latin": recipe_ingredient.ingredient.hindi_name_latin,
            "hindi_name_devnagari": recipe_ingredient.ingredient.hindi_name_devnagari,
            "quantity": recipe_ingredient.quantity,
            "unit": recipe_ingredient.unit
        } for recipe_ingredient in recipe.ingredients
    ]


def getRecipeTags(recipe: Recipe):
    return [tag.name for tag in recipe.tags]


def getRecipeSteps(recipe: Recipe):
    steps = recipe.steps.sort(key=lambda step: step.serial_number)
    return [step.instruction for step in recipe.steps]


def getContributor(recipe: Recipe):
    return {
        "contributor_name": recipe.contributor.name,
        "contributor_bio": recipe.contributor.bio
    }


def getFullRecipe(recipeById: Recipe):
    return {
        "id": recipeById.id,
        "name": recipeById.name,
        "prep_time": recipeById.prep_time,
        "description": recipeById.description,
        "difficulty": recipeById.difficulty,
        "vegetarian": recipeById.vegetarian,
        "quantity": recipeById.quantity,
        "unit": recipeById.unit,
        "contributor_name": recipeById.contributor.name,
        "contributor_bio": recipeById.contributor.bio,
        "recipe_tags": getRecipeTags(recipeById),
        "recipe_ingredients": getRecipeIngredients(recipeById),
        "recipe_steps": getRecipeSteps(recipeById)
    }
