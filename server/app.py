#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User



@app.route('/')
def home():
    return 'pullup!'

# class Users(Resource):
#     def get(self):
#         return [user.to_dict() for user in User.query.all()], 200
    
    
# api.add_resource(Users, '/users')

class UsersByUsername(Resource):
    def get(self, username):
        users = User.query.filter_by(username = username).first()
        return users.to_dict(), 200
    
api.add_resource(UsersByUsername, '/users/<string:username>')

class Signup(Resource):

    def post(self):

        password = request.json['password']
        
        user = User(
            username=request.json['username'],
            first_name=request.json['first_name'],
            last_name=request.json['first_name'],
            email = request.json['email'],
            birthday = request.json['birthday'],
            gender = request.json['gender'],
        )
        
        user.password_hash = password

        try:

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
    
class Login(Resource):

    def post(self):

        username = request.json['username']
        password = request.json['password']

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
            
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
