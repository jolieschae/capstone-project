"""Update tables

Revision ID: 61af074b1c0e
Revises: 24c22608fecd
Create Date: 2023-07-07 13:47:10.979019

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61af074b1c0e'
down_revision = '24c22608fecd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.alter_column('subcategory',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('end_time',
               existing_type=sa.DATETIME(),
               nullable=True)
        batch_op.drop_column('address')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.VARCHAR(), nullable=False))
        batch_op.alter_column('end_time',
               existing_type=sa.DATETIME(),
               nullable=False)
        batch_op.alter_column('subcategory',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
