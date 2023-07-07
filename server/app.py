# Standard library imports
import json
import secrets

# Remote library imports
from flask_restful import Resource
from flask import Flask, request, session, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
from flask_cors import CORS
from flask_session import Session

# Local imports
from config import app, db, api
from models import User, Event, UserEvent
from datetime import timedelta

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'login'

app.secret_key = secrets.token_hex(16)
app.permanent_session_lifetime = timedelta(days=7)

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


CORS(app)

@app.route('/')
def home():
    return 'pullup!'


class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return user_list, 200

    def post(self):
        try:
            new_user = User(
                username=request.json['username'],
                first_name=request.json['first_name'],
                last_name=request.json['last_name'],
                email=request.json['email'],
                birthday=request.json['birthday'],
                gender=request.json['gender'],
            )

            db.session.add(new_user)
            db.session.commit()

            new_user_dict = new_user.to_dict()

            print(new_user_dict)

            return new_user_dict, 201
        except:
            return jsonify({'error': '400: Validation error'}), 400


api.add_resource(Users, '/users')


class UserByUsername(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()

        if user:
            return user.to_dict(), 200
        else:
            return {'error': '404: User not found'}, 404

    def patch(self, username):
        user = User.query.filter_by(username=username).first()
        for attr in request.json():
            setattr(user, attr, request.json()[attr])

        db.session.add(user)
        db.session.commit()

        response = make_response(
            user.to_dict(), 202
        )

        return response

    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            response = make_response("", 204)

            return response

        return {'error': "User not found"}, 404


api.add_resource(UserByUsername, '/users/<string:username>')


class Signup(Resource):
    def post(self):
        password = request.json.get('password')
        password_confirmation = request.json.get('password_confirmation')

        if password != password_confirmation:
            return jsonify({'error': '422 Unprocessable Entity: Passwords do not match'}), 422

        user = User(
            username=request.json['username'],
            first_name=request.json['first_name'],
            last_name=request.json['last_name'],
            email=request.json['email'],
            birthday=request.json['birthday'],
            gender=request.json['gender'],
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201
        except IntegrityError:
            return jsonify({'error': '422 Unprocessable Entity'}), 422


api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    @login_required
    def get(self):
        return current_user.to_dict(), 200


class Login(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            login_user(user)
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


class Logout(Resource):
    @login_required
    def delete(self):
        logout_user()
        return {}, 204


api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')


class Events(Resource):
    def get(self):
        events = Event.query.all()
        event_list = [event.to_dict() for event in events]
        return event_list, 200

    def post(self):
        try:
            new_event = Event(
                host_id=request.json['host_id'],
                title=request.json['title'],
                thumbnail=request.json['thumbnail'],
                category=request.json['category'],
                subcategory=request.json['subcategory'],
                description=request.json['description'],
                venue=request.json.get('venue'),
                city=request.json['city'],
                state=request.json['state'],
                zip=request.json['zip'],
                address=request.json['address'],
                date=request.json['date'],
                start_time=request.json['start_time'],
                end_time=request.json['end_time'],
                age_restrictions=request.json.get('age_restrictions'),
                tickets=request.json.get('tickets'),
                is_active=True
            )

            db.session.add(new_event)
            db.session.commit()

            new_event_dict = new_event.to_dict()

            return jsonify(new_event_dict), 201
        except:
            return jsonify({'error': '400: Validation error'}), 400

    def patch(self, event_id):
        event = Event.query.get(event_id)

        if not event:
            return jsonify({'error': '404: Event not found'}), 404

        try:
            for field in request.json:
                setattr(event, field, request.json[field])

            db.session.commit()

            updated_event_dict = event.to_dict()

            return jsonify(updated_event_dict), 200
        except:
            return jsonify({'error': '400: Validation error'}), 400

    def delete(self, event_id):
        event = Event.query.get(event_id)

        if not event:
            return jsonify({'error': '404: Event not found'}), 404

        db.session.delete(event)
        db.session.commit()

        return '', 204


api.add_resource(Events, '/events')


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
        new_user_event = UserEvent(
            user_id=request.json['user_id'],
            event_id=request.json['event_id'],
            host_id=request.json['host_id'],
            collaborator_id=request.json.get('collaborator_id')
        )

        try:
            db.session.add(new_user_event)
            db.session.commit()

            new_user_event_dict = new_user_event.to_dict()

            return new_user_event_dict, 201
        except:
            return {'error': '400: Validation error'}, 400


api.add_resource(UserEvents, '/userevents/')


class UserEventById(Resource):
    def get(self, id):
        user_event = UserEvent.query.filter_by(id=id).first()

        if user_event:
            return user_event.to_dict(), 200
        else:
            return {'error': '404: Event not found'}, 404

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
        return {'error': "Event not found"}, 404


api.add_resource(UserEventById, '/userevents/<int:id>')


class UserEventByUserId(Resource):
    def get(self, id):
        user_events = UserEvent.query.filter(UserEvent.user_id == id).all()
        return [user_event.to_dict() for user_event in user_events]


api.add_resource(UserEventByUserId, '/userevents/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
