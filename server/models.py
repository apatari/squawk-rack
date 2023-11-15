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

    serialize_rules = ('-workouts.user',)

    @validates('username')
    def validate_username(self, key, name):
        if not name or not 0 < len(name) < 20:
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
    name = db.Column(db.String, unique=True, nullable=False)
    details = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='workouts')
    exercises = db.relationship('Exercise', back_populates='workout')

    serialize_rules = ('-exercises.workout', '-user.workouts')

    @validates('name')
    def validate_name(self, key, name):
        if not name or not len(name):
            raise ValueError("Must provide a name for the workout")
        if len(name) > 40:
            raise ValueError("Name must be 40 characters or fewer")
        return name
    
    @validates('details')
    def validate_details(self, key, details):
        if len(details) > 1000:
            raise ValueError("Must be 1000 characters or fewer")
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
        if not 0 < num < 21:
            raise ValueError("Must be a number from 1 to 20")
        if not type(num) == int:
            raise ValueError("Must be an integer")
        return num

    def __repr__(self):
        return f'Exercise: {self.name}, ID: {self.id}'
