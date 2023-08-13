from sqlalchemy_serializer import SerializerMixin

from config import db

class Column(db.Model, SerializerMixin):
    TYPES = ['Integer', 'String', 'Text', 'DateTime', 'Float', 'Boolean', 'PickleType', 'LargeBinary']

    __tablename__ = 'columns'
    
    id = db.Column(db.Integer, primary_key=True)
    table_id = db.Column(db.Integer, db.ForeignKey('tables.id'))
    name = db.Column(db.String)
    column_type = db.Column(db.String)
    is_pk = db.Column(db.Boolean)
    in_repr = db.Column(db.Boolean)

    table = db.relationship('Table', back_populates='columns')
    from_many_relationships = db.relationship('Relationship', back_populates='from_many', foreign_keys='Relationship.from_many_id', cascade='all,delete-orphan')
    to_one_relationships = db.relationship('Relationship', back_populates='to_one', foreign_keys='Relationship.to_one_id', cascade='all,delete-orphan')

    @property
    def column_type_string(self):
        return Column.TYPES[int(self.column_type)]

    serialize_rules = ('-table.rows', '-from_many_relationships', '-to_one_relationships')

    def __repr__(self):
        return f'<Column {self.id} {self.name}>'