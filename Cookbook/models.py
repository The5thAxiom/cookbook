from enum import unique
from Cookbook import db

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
    difficulty = db.Column(db.String, nullable = False)
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