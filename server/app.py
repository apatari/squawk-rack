#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, render_template
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout, Favorite, Exercise, Review

# Views go here!
def add_exercise_summary_and_favs(workout):
            summary = ', '.join([exercise['name'] for exercise in workout['exercises']])
            if len(summary) > 30:
                summary = summary[:27] + "..."
            workout["summary"] = summary
            if len(workout['details']) > 85 :
                workout['short_details'] = workout['details'][:82] + "..."
            else:
                workout['short_details'] = workout['details']
            workout["favorite_count"] = len(workout["favorites"])
            return workout

class Signup(Resource):

    def post(self):

        json = request.get_json()

        try:
            user = User(username=json.get('username'))
            user.password_hash = json.get('password')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        
        except Exception as err:
            return {"errors": [str(err)]}, 422
        
class Login(Resource):

    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": ["Invalid username and/or password"]}, 401
        
class Logout(Resource):

    def delete(self):

        user = User.query.filter_by(id = session.get('user_id')).first()

        if user:
            session['user_id'] = None
            return {}, 200
        else:
            return {"errors": "Error: cannot log out, you are not logged in"}, 401
        
class CheckSession(Resource):

    def get(self):

        user = User.query.filter_by(id = session.get('user_id')).first()

        if user:
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": "User not logged in"}, 401

class WorkoutIndex(Resource):

    def get(self):

        workouts = [ add_exercise_summary_and_favs(workout.to_dict()) for workout in Workout.query.all()]

        return workouts, 200
    
    def post(self):

        json = request.get_json()

        try:
            new_workout = Workout(
                                    name=json['name'],
                                    details=json['details'],
                                    user_id=json['user_id']
                                    )
            db.session.add(new_workout)
            db.session.commit()

            return new_workout.to_dict(), 201
        
        except Exception as err:
            return {"errors": [str(err)]}, 422

class WorkoutByID(Resource):

    def get(self, id):
        workout = Workout.query.filter_by(id=id).first()

        if workout:
            workout.exercises.sort(key=lambda exercise: exercise.order_number)
            workout = add_exercise_summary_and_favs(workout.to_dict())
            workout["favorite_count"] = len(workout["favorites"])
            return workout, 200
        else:
            return {"error": "workout not found"}, 404

class FavoriteIndex(Resource):

    def post(self):
        json = request.get_json()
        

        fav = Favorite.query.filter_by(user_id=json["user_id"], workout_id=json["workout_id"]).first()
        if fav:
            db.session.delete(fav)
            db.session.commit()
            workout = Workout.query.filter_by(id=json["workout_id"]).first().to_dict()

            return add_exercise_summary_and_favs(workout), 200
        
        else:
            user = User.query.filter_by(id=json["user_id"]).first()
            workout = Workout.query.filter_by(id=json["workout_id"]).first()
            new_favorite = Favorite(user_id=user.id, workout_id=workout.id)
            db.session.add(new_favorite)
            db.session.commit()

            workout = Workout.query.filter_by(id=json["workout_id"]).first().to_dict()

            return add_exercise_summary_and_favs(workout), 200


class ReviewIndex(Resource):

    def post(self):
        json = request.get_json()

        try:
            new_review = Review(user_id=json['user_id'],
                                workout_id=json['workout_id'],
                                rating=json['rating'],
                                comment=json['comment'])
            db.session.add(new_review)
            db.session.commit()

            return new_review.to_dict(), 201
        
        except Exception as err:
            return {"errors": [str(err)]}, 422

class ExerciseIndex(Resource):

    def post(self):

        json = request.get_json()
        exercises = json['exercises']
        result=[]

        try:
            for exercise in exercises:
                new_exercise = Exercise(
                                        name=exercise['name'],
                                        sets=exercise['sets'],
                                        reps=exercise['reps'],
                                        order_number=exercise['order_number'],
                                        workout_id=exercise['workout_id'],
                                        )
                db.session.add(new_exercise)
                result.append(new_exercise.to_dict())
            db.session.commit()

            return result, 201
        
        except Exception as err:
            return {"errors": [str(err)]}, 422


@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


api.add_resource(ExerciseIndex, '/api/exercises', endpoint='exercises')
api.add_resource(ReviewIndex, '/api/reviews', endpoint='reviews')
api.add_resource(FavoriteIndex, '/api/favorites', endpoint='favorites')
api.add_resource(WorkoutByID, '/api/workouts/<int:id>', endpoint='workout_by_id')
api.add_resource(WorkoutIndex, '/api/workouts', endpoint='workouts')
api.add_resource(Login, '/api/login', endpoint='login')
api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(Logout, '/api/logout', endpoint='logout')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

