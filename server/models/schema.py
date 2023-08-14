from sqlalchemy_serializer import SerializerMixin

from config import db

class Schema(db.Model, SerializerMixin):
    __tablename__ = 'schemas'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    user_schemas = db.relationship('UserSchema', back_populates='schema', cascade='all,delete-orphan')
    tables = db.relationship('Table', back_populates='schema', cascade='all,delete-orphan')

    serialize_rules = ('-user_schemas.schema',)

    #ignore header for now
    def export(self):
        output = ''
        for table in self.tables:
            repr_string = f'\tdef __repr__(self):\n\t\treturn f\'<{table.name.capitalize()}'
            relationships = ''
            table_string = f'class {table.name.capitalize()}(db.Model):\n'
            table_string += f"\t__tablename__ = '{table.name.lower()}s'\n\n"

            for column in table.columns:
                fkey = ''
                for r in column.from_many_relationships:
                    relationships += f'\t{r.to_one.table.name.lower()}s = db.relationship('
                    relationships += f"'{r.to_one.table.name.capitalize()}', back_populates='{r.from_many.table.name.lower()}', cascade='add,delete-orphan')\n"
                for r in column.to_one_relationships:
                    fkey = f'{r.from_many.table.name.lower()}s.{r.from_many.name}'
                    relationships += f'\t{r.from_many.table.name.lower()} = db.relationship('
                    relationships += f"'{r.from_many.table.name.capitalize()}', back_populates='{r.to_one.table.name.lower()}s')\n"

                
                table_string += f'\t{column.name.lower()} = db.Column(db.{column.column_type}'
                if column.is_pk:
                    table_string += ', primary_key=True'
                if fkey != '':
                    table_string += f', db.ForeignKey(\'{fkey}\')'
                # if column.is_not_null:
                #     table_string += ', nullable=False'
                if column.in_repr:
                    repr_string += f' {{self.{column.name.lower()}}}'
                table_string += ')\n'
            repr_string += '>\''
            output += table_string + '\n' + relationships + '\n' + repr_string + '\n\n'
        return output

    def __repr__(self):
        return f'<Schema {self.id}: {self.name}>'
