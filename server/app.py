#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

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




api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

