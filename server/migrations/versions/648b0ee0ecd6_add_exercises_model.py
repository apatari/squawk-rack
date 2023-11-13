"""add exercises model

Revision ID: 648b0ee0ecd6
Revises: 3eee42e1fde7
Create Date: 2023-11-13 14:11:40.534333

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '648b0ee0ecd6'
down_revision = '3eee42e1fde7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('sets', sa.Integer(), nullable=False),
    sa.Column('reps', sa.Integer(), nullable=False),
    sa.Column('order_number', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_sets_workout_id_workouts')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sets')
    # ### end Alembic commands ###
