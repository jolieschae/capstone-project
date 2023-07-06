from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from datetime import datetime
import re

from config import db, bcrypt

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    birthday = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)
    location = db.Column(db.String)
    gender = db.Column(db.String, nullable=False)
    art_form = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    host_events = db.relationship("Event", backref="host")
    user_events = db.relationship("UserEvent", backref="user")
    collaborator_events = association_proxy('user_events', 'event')

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
                                                                      
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    subcategory = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    venue = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    age_restrictions = db.Column(db.String, nullable=True)
    tickets = db.Column(db.String, nullable=True)
    is_active = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_events = db.relationship("UserEvent", backref="event")
    collaborators = association_proxy('user_events', 'user')
    # collaborators = db.relationship('User', secondary='user_events', backref='collaborator_events')

    serialize_rules = ("-user_events.event", "-users.events")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_active = datetime.now() < self.date if self.date else False

    def __repr__(self):
        return f"<Title: {self.title} / Category: {self.category}>"


class UserEvent(db.Model, SerializerMixin):
    __tablename__ = 'user_events'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    collaborator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # collaborators = db.relationship('User', secondary='user_event_collaborator', backref='collaborator_event_relationships')

    serialize_rules = ("-user_events.event", "-event.user_events")

    def __repr__(self):
        return "<UserEvent>"

class RSVP(db.Model, SerializerMixin):
    __tablename__ = 'rsvps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    attended = db.Column(db.Boolean, default=False)

    user = db.relationship('User', backref='rsvps')
    event = db.relationship('Event', backref='rsvps')

    serialize_rules = ("-rsvps.user", "-rsvps.event")

    def __repr__(self):
        return "<RSVP>"




# 






# followers = db.Table(
#     'followers',
#     db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('following_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )

# event_categories = db.Table(
#     'event_categories',
#     db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
#     db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
# )

# community_post_categories = db.Table(
#     'community_post_categories',
#     db.Column('community_post_id', db.Integer, db.ForeignKey('community_posts.id'), primary_key=True),
#     db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
# )

# gig_categories = db.Table(
#     'gig_categories',
#     db.Column('gig_id', db.Integer, db.ForeignKey('gigs.id'), primary_key=True),
#     db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
# )

# attendance = db.Table(
#     'attendance',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
# )

# user_event_collaborator = db.Table(
#         'user_event_collaborator',
#         db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#         db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
#     )

# user_event_rsvp = db.Table(
#         'user_event_rsvp',
#         db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#         db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
#     )

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String, unique=True, nullable=False)
#     email = db.Column(db.String, unique=True, nullable=False)
#     birthday = db.Column(db.String, nullable=False)
#     _password_hash = db.Column(db.String, nullable=False)
#     first_name = db.Column(db.String, nullable=False)
#     last_name = db.Column(db.String, nullable=False)
#     avatar = db.Column(db.String)
#     location = db.Column(db.String)
#     gender = db.Column(db.String, nullable=False)
#     art_form = db.Column(db.String)
    
    # active_events = db.relationship('Event', backref='organizer', lazy=True)
    # rsvps = db.relationship('Event', secondary='rsvp', backref='participants', lazy=True)
    # events_attended = db.relationship('Event', secondary='attendance', backref='attendees', lazy=True)
    # events_favorited = db.relationship('Event', secondary='favorites', backref='favorited_by', lazy=True)
    # status_posts = db.relationship('StatusPost', backref='author', lazy=True)
    # community_posts = db.relationship('CommunityPost', backref='author', lazy=True)
    # comments = db.relationship('Comment', backref='author', lazy=True)
    # bookmarked_posts = db.relationship('Post', secondary='bookmarks', backref='bookmarked_by', lazy=True)
    # hosted_gigs = db.relationship('Gig', backref='host', lazy=True)
    # gig_applications = db.relationship('Gig', secondary='gig_applications', backref='responded_by', lazy=True)
    # saved_gigs = db.relationship('Gig', secondary='user_saves', backref='saved_by', lazy=True)
    # galleries = db.relationship('Gallery', backref='user', lazy=True)
    # gallery_images = db.relationship('GalleryImage', backref='user', lazy=True)

    # followers = db.relationship(
    #     'User', secondary=followers,
    #     primaryjoin=(followers.c.follower_id == id),
    #     secondaryjoin=(followers.c.following_id == id),
    #     backref=db.backref('following', lazy='dynamic'), lazy=True
    # )

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     @validates('username')
#     def validate_username(self, key, username):
#         if len(username) > 25 or len(username) < 1:
#             raise ValueError("Username must be between 1 and 25 characters")
#         return username

#     @validates('first_name')
#     def validate_first_name(self, key, first_name):
#         if len(first_name) > 30 or len(first_name) < 1:
#             raise ValueError("Please enter a name between 1 and 30 characters.")
#         return first_name

#     @validates('last_name')
#     def validate_last_name(self, key, last_name):
#         if len(last_name) > 30 or len(last_name) < 1:
#             raise ValueError("Please enter a name between 1 and 30 characters.")
#         return last_name

#     @validates('email')
#     def validate_email(self, key, email):
#         email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
#         if not re.match(email_pattern, email):
#             raise ValueError("Invalid email address format.")

#         return email
    
#     @validates('birthday')
#     def validate_birthday(self, key, birthday):
#         birthdate = datetime.strptime(birthday, '%Y-%m-%d').date()
#         age = (datetime.now().date() - birthdate).days // 365
#         if age < 16:
#             raise ValueError("You must be at least 16 years old to create an account.")

#         return birthday

#     @hybrid_property
#     def password_hash(self):
#         raise AttributeError('Password hashes may not be viewed.')

#     @password_hash.setter
#     def password_hash(self, password):
#         password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
#         self._password_hash = password_hash.decode('utf-8')

#     def authenticate(self, password):
#         return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

#     def __repr__(self):
#         return f"<User: {self.last_name}, {self.first_name} / Username: {self.username}>"
    
# class Event(db.Model, SerializerMixin):
#     __tablename__ = 'events'

#     id = db.Column(db.Integer, primary_key=True)
#     host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     title = db.Column(db.String, nullable=False)
#     thumbnail = db.Column(db.String, nullable=False)
#     category = db.Column(db.String, nullable=False)
#     subcategory = db.Column(db.String, nullable=False)
#     description = db.Column(db.String, nullable=False)
#     venue = db.Column(db.String, nullable=True)
#     city = db.Column(db.String, nullable=False)
#     state = db.Column(db.String, nullable=False)
#     zip = db.Column(db.String, nullable=False)
#     address = db.Column(db.String, nullable=False)
#     date = db.Column(db.DateTime, nullable=False)
#     start_time = db.Column(db.DateTime, nullable=False)
#     end_time = db.Column(db.DateTime, nullable=False)
#     age_restrictions = db.Column(db.String, nullable=True)
#     tickets = db.Column(db.String, nullable=True)
#     is_active = db.Column(db.Boolean, default=datetime.now() < date if date else False)
    
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     host = db.relationship('User', backref='hosted_events', foreign_keys=[host_id])
#     collaborators = db.relationship('User', secondary='event_collaborators', backref='collaborated_events', lazy=True)
#     attendees = db.relationship('User', secondary='attendance', backref='attended_events', lazy=True)
#     categories = db.relationship('Category', secondary=event_categories, backref='events', lazy=True)
#     gallery_images = db.relationship('GalleryImage', backref='event', lazy=True)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     collaborators = db.relationship(
#         'User', secondary="user_event_collaborator",
#         backref=db.backref('events_collaborated', lazy='dynamic'), lazy=True
#     )

#     rsvps = db.relationship(
#         'User', secondary="user_event_rsvp",
#         backref=db.backref('events_rsvped', lazy='dynamic'), lazy=True
#     )

# ### user saves relationship, user-event relationship needs defining

#     userevents = db.relationship("UserEvent", backref="attraction")
#     users = association_proxy('userevents', 'user')

#     serialize_rules = ("-userevents.event", "-users.events")

#     def __repr__(self):
#         return f"<Title: {self.title} / Category: {self.type} / Average Rating: {self.avg_rating}>"

# class UserEvents(db.Model, SerializerMixin):
#     __tablename__ = 'userevents'

#     id = db.Column(db.Integer, primary_key=True)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
#     host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     collaborator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#     event = db.relationship('Event', backref='userevents')
#     host = db.relationship('User', backref='hosted_event_relationships')
#     collaborators = db.relationship('User', secondary='user_event_collaborator', backref='collaborator_event_relationships')
#     rsvps = db.relationship('User', secondary='user_event_rsvp', backref='rsvp_event_relationships')
#     attendees = db.relationship('User', secondary="attendance", backref='events_attended')

#     event = db.relationship('Event', backref='user_event_relationships')
#     host = db.relationship('User', backref='hosted_event_relationships')
#     collaborators = db.relationship('User', secondary='user_event_collaborator', backref='collaborator_event_relationships')
#     rsvps = db.relationship('User', secondary='user_event_rsvp', backref='rsvp_event_relationships')
#     attendees = db.relationship('User', secondary="attendance", backref='events_attended')

    # serialize_rules = ("-user.userevents", "-event.userevents")

    # def __repr__(self): 
    #     return f"<User: {self.user_id} / Event: {self.event_id} / Attended: {self.attended}>"

# class Gig(db.Model, SerializerMixin):
#     __tablename__ = 'gigs'

#     id = db.Column(db.Integer, primary_key=True)
#     host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     collaborator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     date_posted = db.Column(db.DateTime, nullable=False)
#     date_edited = db.Column(db.DateTime, nullable=False)
#     location = db.Column(db.String, nullable=False)
#     dates = db.Column(db.String, nullable=False)
#     start_time = db.Column(db.Time, nullable=False)
#     end_time = db.Column(db.Time, nullable=True)
#     estimated_compensation = db.Column(db.String, nullable=False)
#     position = db.Column(db.String, nullable=False)
#     is_open = db.Column(db.Boolean, nullable=False)
    
#     categories = db.relationship('Category', secondary=gig_categories, backref='gigs', lazy=True)
#     applications = db.relationship('GigApplication', backref='gig', lazy=True)

# ### user saves relationship

# class Category(db.Model):
#     __tablename__ = 'categories'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False, unique=True)

#     gigs = db.relationship('Gig', secondary='gig_categories', backref='categories', lazy=True)
#     community_posts = db.relationship('CommunityPost', backref='category', lazy=True)
#     events = db.relationship('Event', backref='category', lazy=True)

# class GigApplication(db.Model):
#     __tablename__ = 'gig_application'

#     id = db.Column(db.Integer, primary_key=True)
#     gig_id = db.Column(db.Integer, db.ForeignKey('gigs.id'), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# ### need to establish a way to link the host of the gig application, the collaborator on the gig application, and the user applying

# class CommunityPost(db.Model, SerializerMixin):
#     __tablename__ = 'community_posts'

#     id = db.Column(db.Integer, primary_key=True)
#     author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     content = db.Column(db.String, nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     likes = db.relationship('Like', backref='community_post', lazy=True)
#     comments = db.relationship('Comment', backref='community_post', lazy=True)
#     categories = db.relationship('Category', secondary=community_post_categories, backref='community_posts', lazy=True)

# ### user saves relationship

# class Like(db.Model, SerializerMixin):
#     __tablename__ = 'likes'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     post_id = db.Column(db.Integer, db.ForeignKey('community_posts.id'), nullable=False)
#     reply_id = db.Column(db.Integer, db.ForeignKey('replies.id'), nullable=True)

#     user = db.relationship('User', backref='likes')
#     post = db.relationship('CommunityPost', backref='likes')
#     reply = db.relationship('Reply', backref='likes')

# class Comment(db.Model, SerializerMixin):
#     __tablename__ = 'comments'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     post_id = db.Column(db.Integer, db.ForeignKey('community_posts.id'), nullable=False)
#     content = db.Column(db.String, nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     likes = db.relationship('Like', backref='comment', lazy=True)
#     replies = db.relationship('Reply', backref='comment', lazy=True)

# class Reply(db.Model, SerializerMixin):
#     __tablename__ = 'replies'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)
#     content = db.Column(db.String, nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     likes = db.relationship('Like', backref='reply', lazy=True)

# class UserSaves(db.Model, SerializerMixin):
#     __tablename__ = 'user_saves'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)
#     gig_id = db.Column(db.Integer, db.ForeignKey('gigs.id'), nullable=True)
#     community_post_id = db.Column(db.Integer, db.ForeignKey('community_posts.id'), nullable=True)

# class Gallery(db.Model, SerializerMixin):
#     __tablename__ = 'galleries'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.String, nullable=True)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     images = db.relationship('GalleryImage', backref='gallery', lazy=True)


# class GalleryImage(db.Model, SerializerMixin):
#     __tablename__ = 'gallery_images'

#     id = db.Column(db.Integer, primary_key=True)
#     gallery_id = db.Column(db.Integer, db.ForeignKey('galleries.id'), nullable=False)
#     image_url = db.Column(db.String, nullable=False)
#     caption = db.Column(db.String, nullable=True)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
#     event = db.relationship('Event', backref='gallery_images', lazy=True)
#     user = db.relationship('User', backref='gallery_images', lazy=True)














