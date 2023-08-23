from sqlalchemy_serializer import SerializerMixin

from config import db

class Relationship(db.Model, SerializerMixin):
    __tablename__ = 'relationships'

    id = db.Column(db.Integer, primary_key=True)
    from_many_id = db.Column(db.Integer, db.ForeignKey('columns.id'))
    to_one_id = db.Column(db.Integer, db.ForeignKey('columns.id'))
    
    __table_args__ = ( db.UniqueConstraint(from_many_id, from_many_id), )

    from_many = db.relationship('Column', foreign_keys=[from_many_id], back_populates='from_many_relationships')
    to_one = db.relationship('Column', foreign_keys=[to_one_id], back_populates='to_one_relationships')

    def __repr__(self):
        return f'<Relationship {self.from_many.table.name}.{self.from_many.name} >--- {self.to_one.table.name}.{self.to_one.name}>'