"""add constraint to relationship

Revision ID: 3c67dca44f4d
Revises: a736cb8dc87a
Create Date: 2023-08-23 14:22:50.498300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c67dca44f4d'
down_revision = 'a736cb8dc87a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('relationships', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_relationships_from_many_id'), ['from_many_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('relationships', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_relationships_from_many_id'), type_='unique')

    # ### end Alembic commands ###