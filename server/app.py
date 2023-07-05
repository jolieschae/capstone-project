#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource
from flask import request, session, make_response
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Event, UserEvent



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
        
class Events(Resource):
    def get(self):
        events_list = list()
        for event in Event.query.all():
            event_dict = event.to_dict()
            if "description" in event_dict:
                if type(event_dict["description"]) == str:
                    event_dict['description'] = json.loads(event_dict['description'])

            events_list.append(event_dict)
        return events_list, 200


    
api.add_resource(Events, '/Events')

class EventById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()

        if event:
            event_dict = event.to_dict()
            event_dict['description'] = json.loads(event_dict['description']) 
            return event_dict, 200
        else:
            return {'error': '404: Event not found'}, 404

    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(event, attr, request.json[attr])

        db.session.add(event)
        db.session.commit()

        response = make_response(
            event.to_dict(), 202
        )

        return response

api.add_resource(EventById, '/events/<int:id>')

class UserEvents(Resource):
    def get(self):
        return [user_event.to_dict() for user_event in UserEvent.query.all()]
    
    def post(self):

        new_rsvp = UserEvent(
            user_id=request.json['user_id'],
            event_id=request.json['event_id'],
            attended=False
        )
        
        try:
            db.session.add(new_rsvp)
            db.session.commit()

            new_rsvp_dict = new_rsvp.to_dict()

            return new_rsvp_dict, 201
        except:
            return {'error': '400: Validation error'}, 400

api.add_resource(UserEvents, '/rsvps')

class UserEventById(Resource):
    def get(self, id):
        user_event = UserEvent.query.filter_by(id=id).first()

        if user_event:
            return user_event.to_dict(), 200
        else:
            return {'error': '404: Attraction not found'}, 404
        
    def patch(self, id):
        user_event = UserEvent.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(user_event, attr, request.json[attr])

        db.session.add(user_event)
        db.session.commit()

        response = make_response(
            user_event.to_dict(), 202
        )

        return response
    
    def delete(self, id):
        user_event = UserEvent.query.filter_by(id=id).first()

        if user_event:
            db.session.delete(user_event)
            db.session.commit()

            response = make_response("", 204)

            return response
        return {'error': "RSVP not found"}, 404
    
api.add_resource(UserEventById, '/rsvps/<int:id>')

class UserEventByUserId(Resource):
    def get(self, id):

        return [adventure.to_dict() for adventure in UserEvent.query.filter(UserEvent.user_id == id).all()]
    
api.add_resource(UserEventByUserId, '/rsvps/user/<int:id>')

class Signup(Resource):

    def post(self):

        password = request.json['password']
        
        user = User(
            username = request.json['username'],
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
            height = request.json['height']
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
