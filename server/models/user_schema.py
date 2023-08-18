from sqlalchemy_serializer import SerializerMixin

from config import db

class UserSchema(db.Model, SerializerMixin):
    __tablename__ = 'user_schemas'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    schema_id = db.Column(db.Integer, db.ForeignKey('schemas.id'))

    __table_args__ = ( db.UniqueConstraint(user_id, schema_id), )

    user = db.relationship('User', back_populates='user_schemas')
    schema = db.relationship('Schema', back_populates='user_schemas')

    serialize_rules = ('-user.user_schemas', '-schema.user_schemas')

    def __repr__(self):
        return f'<UserSchema {self.id}: User {self.user_id}, Schema {self.schema_id}>'