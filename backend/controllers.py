from backend import db
from backend.models import *


def addFullRecipe(newRecipeFull):
    # adding the contributor (if it doesn't exist already)
    contributor = Contributor.query.filter_by(
        name=newRecipeFull["contributor_name"]
    ).first()
    if contributor is None:
        contributor = Contributor(**{
            "name": newRecipeFull["contributor_name"]
        })
        db.session.add(contributor)
        db.session.commit()

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
    recipeIngredients = []
    for recipe_ingredient in Recipe_Ingredient.query.filter_by(recipe_id=recipe.id):
        ingredient = Ingredient.query.filter_by(
            id=recipe_ingredient.ingredient_id).first()
        recipeIngredients.append({
            "english_name": ingredient.english_name,
            "hindi_name_latin": ingredient.hindi_name_latin,
            "hindi_name_devnagari": ingredient.hindi_name_devnagari,
            "quantity": recipe_ingredient.quantity,
            "unit": recipe_ingredient.unit
        })
    return recipeIngredients


def getRecipeTag(recipe: Recipe):
    return [
        tag.name for tag in
        Tag.query
        .filter_by(recipe_id=recipe.id)
    ]


def getRecipeSteps(recipe: Recipe):
    return [
        step.instruction for step in
        Recipe_Step.query
        .filter_by(recipe_id=recipe.id)
        .order_by(Recipe_Step.serial_number)
    ]


def getContributor(recipe: Recipe):
    contributor = Contributor.query.get(recipe.contributor_id)
    return {
        "contributor_name": contributor.name,
        "contributor_bio": contributor.name
    }


def getFullRecipe(recipeById: Recipe):
    c = getContributor(recipeById)
    return {
        "id": recipeById.id,
        "name": recipeById.name,
        "prep_time": recipeById.prep_time,
        "description": recipeById.description,
        "difficulty": recipeById.difficulty,
        "vegetarian": recipeById.vegetarian,
        "quantity": recipeById.quantity,
        "unit": recipeById.unit,
        "contributor_name": c["contributor_name"],
        "contributor_bio": c["contributor_bio"],
        "recipe_tags": getRecipeTag(recipeById),
        "recipe_ingredients": getRecipeIngredients(recipeById),
        "recipe_steps": getRecipeSteps(recipeById)
    }
