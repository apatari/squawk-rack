"""fix table name

Revision ID: d5c05db24345
Revises: 648b0ee0ecd6
Create Date: 2023-11-13 14:12:15.549084

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5c05db24345'
down_revision = '648b0ee0ecd6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('sets', sa.Integer(), nullable=False),
    sa.Column('reps', sa.Integer(), nullable=False),
    sa.Column('order_number', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_exercises_workout_id_workouts')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('sets')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sets',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('sets', sa.INTEGER(), nullable=False),
    sa.Column('reps', sa.INTEGER(), nullable=False),
    sa.Column('order_number', sa.INTEGER(), nullable=False),
    sa.Column('workout_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name='fk_sets_workout_id_workouts'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('exercises')
    # ### end Alembic commands ###
