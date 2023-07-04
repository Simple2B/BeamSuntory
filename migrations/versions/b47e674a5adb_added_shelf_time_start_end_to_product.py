"""added shelf time start/end to product

Revision ID: b47e674a5adb
Revises: 33dffcf321b3
Create Date: 2023-07-04 10:18:01.369904

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "b47e674a5adb"
down_revision = "33dffcf321b3"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.add_column(sa.Column("shelf_life_start", sa.DateTime()))
        batch_op.add_column(sa.Column("shelf_life_end", sa.DateTime()))
        batch_op.drop_column("shelf_life")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "shelf_life",
                postgresql.TIMESTAMP(),
                autoincrement=False,
                nullable=False,
            )
        )
        batch_op.drop_column("shelf_life_end")
        batch_op.drop_column("shelf_life_start")

    # ### end Alembic commands ###
