from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)

    user_schemas = db.relationship('UserSchema', back_populates='user', cascade='all,delete-orphan')

    schemas = association_proxy('user_schemas','schema')

    serialize_rules = ('-user_schemas.user', )

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'