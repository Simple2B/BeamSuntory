"""notes for wm and da

Revision ID: df2c1fb9efcf
Revises: 6740fcf55222
Create Date: 2023-08-24 23:06:37.563271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "df2c1fb9efcf"
down_revision = "6740fcf55222"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ship_requests", schema=None) as batch_op:
        batch_op.add_column(sa.Column("wm_notes", sa.Text(), nullable=True))
        batch_op.add_column(sa.Column("da_notes", sa.Text(), nullable=True))
        batch_op.alter_column(
            "comment",
            existing_type=sa.VARCHAR(length=256),
            type_=sa.Text(),
            existing_nullable=True,
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ship_requests", schema=None) as batch_op:
        batch_op.alter_column(
            "comment",
            existing_type=sa.Text(),
            type_=sa.VARCHAR(length=256),
            existing_nullable=True,
        )
        batch_op.drop_column("da_notes")
        batch_op.drop_column("wm_notes")

    # ### end Alembic commands ###
