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
    
#     def post(self):
#         new_user = User(
#             username=request.json['username'],
#             first_name=request.json['first_name'],
#             last_name=request.json['first_name'],
#             email = request.json['email'],
#             birthday = request.json['birthday'],
#             avatar = request.json['avatar'],
#             location = request.json['location'],
#             gender = request.json['gender'],
#             art_form = request.json['art_form'],
#             )    
        
#         db.session.add(new_user)
#         db.session.commit()

#         new_user_dict = new_user.to_dict()

#         return new_user_dict, 201
    
# # api.add_resource(Users, '/users')

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
        
api.add_resource(Signup, '/signup')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
