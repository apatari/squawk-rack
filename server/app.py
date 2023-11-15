#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout

# Views go here!

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

        workouts = [ add_exercise_summary_and_favs(workout.to_dict()) for workout in Workout.query.all()]

        return workouts, 200

class WorkoutByID(Resource):

    def get(self, id):
        workout = Workout.query.filter_by(id=id).first()

        if workout:
            workout.exercises.sort(key=lambda exercise: exercise.order_number)
            workout = workout.to_dict()
            workout["favorite_count"] = len(workout["favorites"])
            return workout, 200
        else:
            return {"error": "workout not found"}, 404

api.add_resource(WorkoutByID, '/api/workouts/<int:id>', endpoint='workout_by_id')
api.add_resource(WorkoutIndex, '/api/workouts', endpoint='workouts')
api.add_resource(Login, '/api/login', endpoint='login')
api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(Logout, '/api/logout', endpoint='logout')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

