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

class Users(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200
    
    def post(self):
        try:
            new_user = User(
            username=request.form['username'],
            first_name=request.form['first_name'],
            last_name=request.form['first_name'],
            email = request.form['email'],
            birthday = request.form['birthday'],
            gender = request.form['gender'],
        )
        
            db.session.add(new_user)
            db.session.commit()

            new_user_dict = new_user.to_dict()

            return new_user_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            return user.to_dict(), 200
        else:
            return {'error': '404: User not found'}, 404
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        for attr in request.json():
            setattr(user, attr, request.json()[attr])

        db.session.add(user)
        db.session.commit()

        response = make_response(
            user.to_dict(), 202
        )

        return response
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            response = make_response("", 204)

            return response

        return {'error': "User not found"}, 404
        
api.add_resource(UserById, '/users/<int:id>')

class Signup(Resource):

    def post(self):

        password = request.json['password']
        password_confirmation = request.json['password_confirmation']

        if password != password_confirmation:
            return {'error': '422 Unprocessable Entity: Passwords do not match'}, 422
        
        user = User(
            username=request.json['username'],
            first_name=request.json['first_name'],
            last_name=request.json['last_name'],
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
        
class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401
    
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
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
