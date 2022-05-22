from backend import db

# adding images still needs to be workshopped

# The database
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    english_name = db.Column(db.String, unique = True, nullable = False)
    hindi_name_latin = db.Column(db.String, nullable = False, unique = True)
    hindi_name_devnagari = db.Column(db.Text, unique = True)
    recipes = db.relationship(
        'Recipe_Ingredient',
        backref=db.backref('ingredient', uselist=False),
        lazy=True
    )

class Contributor(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    bio = db.Column(db.String)
    recipes = db.relationship(
        'Recipe',
        backref=db.backref('contributor', uselist=False),
        lazy=True
    )
    skills = db.relationship(
        'Skill',
        backref=db.backref('contributor', uselist=False),
        lazy=True
    )

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    #header_image = db.Column(db.Blob(), nullable = False)
    prep_time = db.Column(db.Integer, nullable = False)
    description = db.Column(db.Text, nullable = False)
    difficulty = db.Column(db.Integer, nullable = False)
    contributor_id = db.Column(
        db.Integer,
        db.ForeignKey("contributor.id"),
        nullable = False
    )
    vegetarian = db.Column(db.Boolean, nullable = False)
    quantity = db.Column(db.Float, nullable = False)
    unit = db.Column(db.String, nullable = False)
    steps = db.relationship(
        'Recipe_Step',
        backref = db.backref('recipe', uselist=False),
        lazy=True
    )
    tags = db.relationship(
        'Tag',
        backref='recipes',
        lazy=True
    )
    ingredients = db.relationship(
        'Recipe_Ingredient',
        backref = db.backref('recipe', uselist=False),
        lazy=False
    )

    def __repr__(self):
        return f"<Recipe {self.id}: {self.name}>"

class Recipe_Step(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable = False
    )
    serial_number = db.Column(db.Integer, nullable = False)
    instruction = db.Column(db.String, nullable = False)

class Recipe_Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable = False
    )
    ingredient_id = db.Column(
        db.Integer,
        db.ForeignKey("ingredient.id"),
        nullable=False
    )
    quantity = db.Column(db.Float, nullable = False)
    unit = db.Column(db.String, nullable = False)

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    #header_image = db.Column(db.LargeBinary, nullable = False)
    description = db.Column(db.String, nullable = False)
    difficulty = db.Column(db.String, nullable = False)
    contributor_id = db.Column(
        db.Integer,
        db.ForeignKey("contributor.id"),
        nullable=False
    )
    steps = db.relationship(
        'Skill_Step',
        backref = db.backref('skill', uselist=False),
        lazy=True
    )

class Skill_Step(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("skill.id"),
        nullable = False
    )
    serial_number = db.Column(db.Integer, nullable = False)
    instruction = db.Column(db.String, nullable = False)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable = True
    )
    skill_id = db.Column(
        db.Integer,
        db.ForeignKey("skill.id"),
        nullable=True
    )
    name = db.Column(db.String, nullable = False)