from config import db
from app import app
from models import User, UserSchema, Schema, Table, Column, Relationship

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        UserSchema.query.delete()
        Schema.query.delete()
        Table.query.delete()
        Column.query.delete()
        Relationship.query.delete()


        user1 = User(username='Marc', password_hash='123456')
        db.session.add(user1)

        schema1 = Schema(name='Wiccapedia')
        db.session.add(schema1)
        db.session.commit()

        user_schema1 = UserSchema(user_id=user1.id, schema_id=schema1.id)
        db.session.add(user_schema1)

        page_table = Table(name='Page', schema_id=schema1.id)
        db.session.add(page_table)
        db.session.commit()

        id = Column(
            name='id',
            column_type='Integer',
            is_pk=True,
            in_repr=True,
            table_id=page_table.id
        )
        title = Column(
            name='title',
            column_type='String',
            is_pk=False,
            in_repr=True,
            table_id=page_table.id
        )
        text = Column(
            name='text',
            column_type='String',
            is_pk=False,
            in_repr=False,
            table_id=page_table.id
        )
        author = Column(
            name='author',
            column_type='String',
            is_pk=False,
            in_repr=False,
            table_id=page_table.id
        )
        db.session.add_all([id,title,text,author])
        db.session.commit()

        edit_table = Table(name='Edit', schema_id=schema1.id)
        db.session.add(edit_table)
        db.session.commit()

        edit_table_id = Column(
            name='id',
            column_type='Integer',
            is_pk=True,
            in_repr=True,
            table_id=edit_table.id
        )
        diff = Column(
            name='diff',
            column_type='String',
            is_pk=False,
            in_repr=False,
            table_id=edit_table.id
        )
        page_id = Column(
            name='page_id',
            column_type='Integer',
            table_id=edit_table.id
        )

        db.session.add_all([edit_table_id,diff,page_id])
        db.session.commit()

        r1 = Relationship(
            from_many_id=id.id,
            to_one_id=page_id.id
        )
        db.session.add(r1)

        schema2 = Schema(name='food stuff')
        db.session.add(schema2)
        db.session.commit()

        user_schema2 = UserSchema(user_id=user1.id, schema_id=schema2.id)
        db.session.add(user_schema2)

        ingredient_table = Table(name='ingredient', schema_id=schema2.id)
        db.session.add(ingredient_table)
        db.session.commit()

        ing_id = Column(
            name='id',
            column_type='Integer',
            is_pk=True,
            in_repr=True,
            table_id=ingredient_table.id
        )

        ing_name = Column(
            name='name',
            column_type='String',
            is_pk=False,
            in_repr=True,
            table_id=ingredient_table.id
        )
        db.session.add_all([ing_id, ing_name])
        db.session.commit()

        db.session.commit()