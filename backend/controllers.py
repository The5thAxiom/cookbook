from backend import db, bcrypt
from backend.models import *


def addFullRecipe(newRecipeFull: str, contributor_id: int):
    newRecipe = Recipe(**{
        "name": newRecipeFull["name"],
        "prep_time": newRecipeFull["prep_time"],
        "description": newRecipeFull["description"],
        "difficulty": newRecipeFull["difficulty"],
        "contributor_id": contributor_id,
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
    newUser['password'] = bcrypt.generate_password_hash(
        newUser['password'].encode('utf-8'))
    user = User(**newUser)
    db.session.add(user)
    db.session.commit()
    db.session.add(Collection(**{
        'name': 'favourites',
        'user_id': user.id
    }))
    db.session.commit()


def getRecipeById(id: int) -> Recipe:
    return Recipe.query.get(id)


def getNextOf(id: int) -> int:
    return id + 1


def getPrevOf(id: int) -> int:
    return id - 1


def getRecipeMeta(recipeById: Recipe):
    return {
        "id": recipeById.id,
        "name": recipeById.name,
        "prep_time": recipeById.prep_time,
        "description": recipeById.description,
        "difficulty": recipeById.difficulty,
        "vegetarian": recipeById.vegetarian,
        "quantity": recipeById.quantity,
        "unit": recipeById.unit,
        "contributor_username": recipeById.contributor.username,
        "next_id": getNextOf(recipeById.id),
        "prev_id": getPrevOf(recipeById.id)
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
        "contributor_username": recipeById.contributor.username,
        "contributor_bio": recipe.contributor.bio
    }


def getRecipeFull(recipeById: Recipe):
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
        "contributor_username": recipeById.contributor.username,
        "contributor_bio": recipeById.contributor.bio,
        "recipe_tags": getRecipeTags(recipeById),
        "recipe_ingredients": getRecipeIngredients(recipeById),
        "recipe_steps": getRecipeSteps(recipeById),
        "next_id": getNextOf(recipeById.id),
        "prev_id": getPrevOf(recipeById.id)
    }
