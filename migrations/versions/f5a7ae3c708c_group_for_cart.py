"""group for cart

Revision ID: f5a7ae3c708c
Revises: 442e5eadc19b
Create Date: 2023-07-27 15:38:13.132267

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f5a7ae3c708c"
down_revision = "442e5eadc19b"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("carts", schema=None) as batch_op:
        batch_op.add_column(sa.Column("group", sa.String(length=64), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("carts", schema=None) as batch_op:
        batch_op.drop_column("group")

    # ### end Alembic commands ###