from sqlalchemy_serializer import SerializerMixin

from config import db

class Table(db.Model, SerializerMixin):
    __tablename__ = 'tables'
    
    id = db.Column(db.Integer, primary_key=True)
    schema_id = db.Column(db.Integer, db.ForeignKey('schemas.id'))
    name = db.Column(db.String)

    schema = db.relationship('Schema', back_populates='tables')
    columns = db.relationship('Column', back_populates='table', cascade='all,delete-orphan')

    serialize_rules = ('-columns.table', '-schema',)

    def __repr__(self):
        return f'<Table {self.id}: {self.name}>'
