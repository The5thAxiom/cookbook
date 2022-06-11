from backend import db

# adding images still needs to be workshopped

# The database


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    english_name = db.Column(db.String(128), unique=True, nullable=False)
    hindi_name_latin = db.Column(db.String(128), nullable=True, unique=True)
    hindi_name_devnagari = db.Column(
        db.String(256), nullable=True, unique=True)
    recipes = db.relationship(
        'Recipe_Ingredient',
        backref=db.backref('ingredient', uselist=False),
        lazy=True
    )

    def to_dict(self):
        return {
            "english_name": self.english_name,
            "hindi_name_latin": self.hindi_name_latin,
            "hindi_name_devnagari": self.hindi_name_devnagari
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=False)
    username = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String(64), nullable=False, unique=False)
    bio = db.Column(db.Text, nullable=True, unique=False)
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
    collections = db.relationship(
        'Collection',
        backref=db.backref('user', uselist=False),
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "bio": self.bio
        }


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    #header_image = db.Column(db.Blob(), nullable = False)
    prep_time = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    vegetarian = db.Column(db.Boolean, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(64), nullable=False)
    contributor_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )
    steps = db.relationship(
        'Recipe_Step',
        backref=db.backref('recipe', uselist=False),
        lazy=True
    )
    tags = db.relationship(
        'Tag',
        backref='recipes',
        lazy=True
    )
    ingredients = db.relationship(
        'Recipe_Ingredient',
        backref=db.backref('recipe', uselist=False),
        lazy=False
    )

    def __repr__(self):
        return f"<Recipe {self.id}: {self.name}>"


class Recipe_Step(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable=False
    )
    # recipe (backref)
    serial_number = db.Column(db.Integer, nullable=False)
    instruction = db.Column(db.Text, nullable=False)


class Recipe_Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable=False
    )
    ingredient_id = db.Column(
        db.Integer,
        db.ForeignKey("ingredient.id"),
        nullable=False
    )
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(64), nullable=False)


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    #header_image = db.Column(db.LargeBinary, nullable = False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    contributor_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )
    steps = db.relationship(
        'Skill_Step',
        backref=db.backref('skill', uselist=False),
        lazy=True
    )


class Skill_Step(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("skill.id"),
        nullable=False
    )
    serial_number = db.Column(db.Integer, nullable=False)
    instruction = db.Column(db.Text, nullable=False)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(
        db.Integer,
        db.ForeignKey("recipe.id"),
        nullable=True
    )
    skill_id = db.Column(
        db.Integer,
        db.ForeignKey("skill.id"),
        nullable=True
    )
    name = db.Column(db.String(64), nullable=False)


Collection_Recipe = db.Table('Collection_Recipe',
                             db.Column(
                                 'id',
                                 db.Integer,
                                 primary_key=True
                             ),
                             db.Column(
                                 'collection_id',
                                 db.Integer,
                                 db.ForeignKey('collection.id'),
                                 nullable=False
                             ),
                             db.Column(
                                 'recipe_id',
                                 db.Integer,
                                 db.ForeignKey('recipe.id'),
                                 nullable=False
                             )
                             )


class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )
    recipes = db.relationship(
        'Recipe',
        secondary=Collection_Recipe,
        backref='collections',
        lazy=True
    )
