from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    workouts = db.relationship('Workout', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='user')
    favorite_workouts = association_proxy('favorites', 'workout', 
                                          creator=lambda workout_obj: Favorite(workout=workout_obj))
    reviews = db.relationship('Review', back_populates='user')
    reviewed_workouts = association_proxy('reviews', 'workout',
                                          creator=lambda workout_obj: Review(workout=workout_obj) )

    serialize_rules = ('-workouts.user', 
                       '-favorite_workouts.user', 
                       '-favorites.user', 
                       '-_password_hash', 
                       '-reviews.user',
                       '-favorite_workouts.reviews',
                       
                       )

    @validates('username')
    def validate_username(self, key, name):
        if not name or not 0 < len(name) <= 20:
            raise ValueError("Name must be 1-20 characters")
        if name in [user.username for user in User.query.all()]:
            raise ValueError("Sorry, that username is not available")
        return name
    

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 4:
            raise ValueError("Passwords must be 4 or more characters")
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'
    
class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    details = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='workouts')
    exercises = db.relationship('Exercise', back_populates='workout', cascade='all')
    favorites = db.relationship('Favorite', back_populates='workout', cascade='all')
    favorite_users = association_proxy('favorites', 'user', 
                                          creator=lambda user_obj: Favorite(user=user_obj))
    reviews = db.relationship('Review', back_populates='workout', cascade='all')
    reviewed_users = association_proxy('reviews', 'user', 
                                       creator=lambda user_obj: Review(user=user_obj))

    serialize_rules = ('-exercises.workout', 
                       '-user.workouts', 
                       '-favorite_users.workouts', 
                       '-favorites.workout', 
                       '-user.favorites',
                       '-reviews.workout',
                       '-favorite_users.reviews',
                       '-user.reviews',
                       
                       )

    @validates('name')
    def validate_name(self, key, name):
        if not name or not len(name):
            raise ValueError("Must provide a name for the workout")
        if len(name) > 40:
            raise ValueError("Name must be 40 characters or fewer")
        return name
    
    @validates('details')
    def validate_details(self, key, details):
        if  len(details) > 1000 or len(details) < 1:
            raise ValueError("Must be 1 - 1000 characters")
        return details

    def __repr__(self):
        return f'Workout: {self.name}, ID: {self.id}'
    
class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    order_number = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    workout = db.relationship('Workout', back_populates="exercises")
    

    serialize_rules = ('-workout.exercises',)

    @validates('name')
    def validate_name(self, key, name):
        if not name or not len(name):
            raise ValueError("Must provide a name for the exercise")
        return name
    
    @validates('sets', 'reps')
    def validate_numbers(self, key, num):
        if not 0 < num < 100 or not type(num) == int:
            raise ValueError("Must provide an integer from 1 to 100")
        return num

    @validates('order_number')
    def validate_order(self, key, num):
        if not 0 <= num < 21:
            raise ValueError("Must be a number from 1 to 20")
        if not type(num) == int:
            raise ValueError("Must be an integer")
        return num

    def __repr__(self):
        return f'Exercise: {self.name}, ID: {self.id}'
    
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    user = db.relationship('User', back_populates='favorites')
    workout = db.relationship('Workout', back_populates='favorites')

    serialize_only = ('id', 'user_id', 'workout_id')
    # serialize_rules = ('-user.signups', '-workout.signups', '-user.favorites', '-workout.favorites')

    def __repr__(self):
        return f'Favorite {self.id}'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)

    user = db.relationship('User', back_populates='reviews')
    workout = db.relationship('Workout', back_populates='reviews')

    serialize_only = ('id', 'user_id', 'workout_id', 'rating', 'comment', 'user.username')

    # serialize_rules = ('-user.reviews', '-workout.reviews', '-user.favorite_workouts', '-workout.favorite_users', '-user.workouts')

    @validates('rating')
    def validate_rating(self, key, num):
        if not 0<= num <= 5 or not type(num) == int:
            raise ValueError("Rating must be a number between 0 and 5")
        return num
    
    @validates('comment')
    def validate_comment(self, key, comm):
        if len(comm) > 1000:
            raise ValueError("Comment must be fewer than 1000 characters")
        return comm
