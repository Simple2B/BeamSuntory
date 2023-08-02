"""add request-share-user

Revision ID: 81bb0389bc64
Revises: dee7621445a9
Create Date: 2023-08-02 12:28:11.608910

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81bb0389bc64'
down_revision = 'dee7621445a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('request_share', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('request_share', schema=None) as batch_op:
        batch_op.drop_column('status')

    # ### end Alembic commands ###
