from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import re

from config import db, bcrypt


followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('following_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    birthday = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    art_form = db.Column(db.String, nullable=False)
    gallery = db.Column(db.String, nullable=True)
    
    active_events = db.relationship('Event', backref='organizer', lazy=True)
    rsvps = db.relationship('Event', secondary='rsvp', backref='participants', lazy=True)
    events_attended = db.relationship('Event', secondary='attendance', backref='attendees', lazy=True)
    events_favorited = db.relationship('Event', secondary='favorites', backref='favorited_by', lazy=True)
    status_posts = db.relationship('StatusPost', backref='author', lazy=True)
    community_posts = db.relationship('CommunityPost', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    bookmarked_posts = db.relationship('Post', secondary='bookmarks', backref='bookmarked_by', lazy=True)

    followers = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.following_id == id),
        backref=db.backref('following', lazy='dynamic'), lazy=True
    )

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('username')
    def validate_username(self, key, username):
        if len(username) > 25 or len(username) < 1:
            raise ValueError("Username must be between 1 and 25 characters")
        return username

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) > 30 or len(first_name) < 1:
            raise ValueError("Please enter a name between 1 and 30 characters.")
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) > 30 or len(last_name) < 1:
            raise ValueError("Please enter a name between 1 and 30 characters.")
        return last_name

    @validates('email')
    def validate_email(self, key, email):
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            raise ValueError("Invalid email address format.")

        return email
    
    @validates('birthday')
    def validate_birthday(self, key, birthday):
        birthdate = datetime.strptime(birthday, '%Y-%m-%d').date()
        age = (datetime.now().date() - birthdate).days // 365
        if age < 16:
            raise ValueError("You must be at least 16 years old to create an account.")

        return birthday

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<User: {self.last_name}, {self.first_name} / Username: {self.username}>"
    
    class Event(db.Model):
        __tablename__ = 'events'

        id = db.Column(db.Integer, primary_key=True)
        host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
        title = db.Column(db.String, nullable=False)
        thumbnail = db.Column(db.String, nullable=False)
        category = db.Column(db.String, nullable=False)
        description = db.Column(db.String, nullable=False)
        venue = db.Column(db.String, nullable=True)
        city = db.Column(db.String, nullable=False)
        state = db.Column(db.String, nullable=False)
        zip = db.Column(db.String, nullable=False)
        address = db.Column(db.String, nullable=False)
        start_time = db.Column(db.DateTime, nullable=False)
        end_time = db.Column(db.DateTime, nullable=False)
        age_restrictions = db.Column(db.String, nullable=True)
        tickets = db.Column(db.String, nullable=True)


        host = db.relationship('User', backref='hosted_events', foreign_keys=[host_id])
        collaborators = db.relationship('User', secondary='event_collaborators', backref='collaborated_events', lazy=True)
        attendees = db.relationship('User', secondary='attendance', backref='attended_events', lazy=True)
        favorited_by = db.relationship('User', secondary='favorites', backref='favorite_events', lazy=True)

        created_at = db.Column(db.DateTime, server_default=db.func.now())
        updated_at = db.Column(db.DateTime, onupdate=db.func.now())













