"""nullable-true for parent_role division

Revision ID: cef2e6ffcec6
Revises: cd6ddb063574
Create Date: 2023-07-31 19:51:35.070315

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cef2e6ffcec6"
down_revision = "cd6ddb063574"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("divisions", schema=None) as batch_op:
        batch_op.alter_column(
            "parent_role", existing_type=sa.VARCHAR(length=64), nullable=True
        )

    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("divisions", schema=None) as batch_op:
        batch_op.alter_column(
            "parent_role", existing_type=sa.VARCHAR(length=64), nullable=True
        )

    # ### end Alembic commands ###
