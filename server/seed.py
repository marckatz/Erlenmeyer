from config import db
from app import app
from models import User, UserSchema, Schema, Table, Column, Relationship

if __name__ == '__main__':
    with app.app_context():
        print("Starting seeding")
        
        print("Clearing tables... ", end='')
        
        User.query.delete()
        UserSchema.query.delete()
        Schema.query.delete()
        Table.query.delete()
        Column.query.delete()
        Relationship.query.delete()
        
        print("Done")

        print("Adding first schema... ", end='')

        schema1 = Schema(name='Wiccapedia')
        db.session.add(schema1)
        db.session.commit()

        page_table = Table(name='Page', schema_id=schema1.id)
        db.session.add(page_table)
        db.session.commit()

        page_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=page_table.id
            ),
            Column(
                name='title',
                column_type='String',
                is_pk=False,
                in_repr=True,
                table_id=page_table.id
            ),
            Column(
                name='text',
                column_type='String',
                is_pk=False,
                in_repr=False,
                table_id=page_table.id
            ),
            Column(
                name='author',
                column_type='String',
                is_pk=False,
                in_repr=False,
                table_id=page_table.id
            )
        ]
        db.session.add_all(page_columns)
        db.session.commit()

        edit_table = Table(name='Edit', schema_id=schema1.id)
        db.session.add(edit_table)
        db.session.commit()

        edit_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=edit_table.id
            ),
            Column(
                name='diff',
                column_type='String',
                is_pk=False,
                in_repr=False,
                table_id=edit_table.id
            ),
            Column(
                name='page_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=edit_table.id
            ),
            Column(
                name='user_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=edit_table.id
            ),
            Column(
                name='time',
                column_type='DateTime',
                is_pk=False,
                in_repr=False,
                table_id=edit_table.id
            )
        ]

        db.session.add_all(edit_columns)
        db.session.commit()

        user_table = Table(name='User', schema_id=schema1.id)
        db.session.add(user_table)
        db.session.commit()

        user_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=user_table.id
            ),
            Column(
                name='username',
                column_type='String',
                is_pk=False,
                in_repr=True,
                table_id=user_table.id
            ),
            Column(
                name='_password_hash',
                column_type='String',
                is_pk=False,
                in_repr=False,
                table_id=user_table.id
            )
        ]

        db.session.add_all(user_columns)
        db.session.commit()

        print("Done")

        # r1 = Relationship(
        #     from_many_id=id.id,
        #     to_one_id=page_id.id
        # )
        # db.session.add(r1)

        print("Adding second schema... ", end='')

        schema2 = Schema(name='Pantry Planner')
        db.session.add(schema2)
        db.session.commit()

        ingredient_table = Table(name='Ingredient', schema_id=schema2.id)
        db.session.add(ingredient_table)
        db.session.commit()

        ingredient_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=ingredient_table.id
            ),
            Column(
                name='name',
                column_type='String',
                is_pk=False,
                in_repr=True,
                table_id=ingredient_table.id
            )
        ]
        db.session.add_all(ingredient_columns)
        db.session.commit()

        recipe_table = Table(name='Recipe', schema_id=schema2.id)
        db.session.add(recipe_table)
        db.session.commit()

        recipe_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=recipe_table.id
            ),
            Column(
                name='name',
                column_type='String',
                is_pk=False,
                in_repr=True,
                table_id=recipe_table.id
            ),
            Column(
                name='directions',
                column_type='String',
                is_pk=False,
                in_repr=False,
                table_id=recipe_table.id
            )
        ]
        db.session.add_all(recipe_columns)
        db.session.commit()

        fridge_table = Table(name='Fridge', schema_id=schema2.id)
        db.session.add(fridge_table)
        db.session.commit()

        fridge_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=fridge_table.id
            ),
            Column(
                name='user',
                column_type='String',
                is_pk=False,
                in_repr=True,
                table_id=fridge_table.id
            )
        ]
        db.session.add_all(fridge_columns)
        db.session.commit()

        fridge_ingredient_table = Table(name='FridgeIngredient', schema_id=schema2.id)
        db.session.add(fridge_ingredient_table)
        db.session.commit()

        fridge_ingredient_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=fridge_ingredient_table.id
            ),
            Column(
                name='fridge_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=fridge_ingredient_table.id
            ),
            Column(
                name='ingredient_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=fridge_ingredient_table.id
            )
        ]
        db.session.add_all(fridge_ingredient_columns)
        db.session.commit()

        recipe_ingredient_table = Table(name='RecipeIngredient', schema_id=schema2.id)
        db.session.add(recipe_ingredient_table)
        db.session.commit()

        recipe_ingredient_columns = [
            Column(
                name='id',
                column_type='Integer',
                is_pk=True,
                in_repr=True,
                table_id=recipe_ingredient_table.id
            ),
            Column(
                name='recipe_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=recipe_ingredient_table.id
            ),
            Column(
                name='ingredient_id',
                column_type='Integer',
                is_pk=False,
                in_repr=False,
                table_id=recipe_ingredient_table.id
            )
        ]
        db.session.add_all(recipe_ingredient_columns)
        db.session.commit()

        print("Done")

        print("Adding users... ", end='')

        user1 = User(username='marc', password_hash='123456')
        user2 = User(username='tj', password_hash='123456')
        user3 = User(username='yu', password_hash='123456')
        user4 = User(username='shanley', password_hash='123456')
        user5 = User(username='sadaf', password_hash='123456')
        db.session.add_all([user1, user2, user3, user4, user5])
        db.session.commit()

        print("Done")

        print("Associating Users with Schemas... ", end='')

        user_schemas = [
            UserSchema(user_id=user1.id, schema_id=schema1.id),
            UserSchema(user_id=user1.id, schema_id=schema2.id),
            UserSchema(user_id=user4.id, schema_id=schema2.id),
            UserSchema(user_id=user5.id, schema_id=schema2.id)
        ]
        db.session.add_all(user_schemas)


        db.session.commit()