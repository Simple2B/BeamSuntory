"""add request share

Revision ID: 22393992ca51
Revises: 86c602aa44db
Create Date: 2023-08-01 17:40:03.137978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "22393992ca51"
down_revision = "86c602aa44db"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.alter_column(
            "inbound_order_id", existing_type=sa.INTEGER(), nullable=False
        )

    with op.batch_alter_table("warehouse_product", schema=None) as batch_op:
        batch_op.alter_column("group_id", existing_type=sa.INTEGER(), nullable=False)

    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("warehouse_product", schema=None) as batch_op:
        batch_op.alter_column("group_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.alter_column(
            "inbound_order_id", existing_type=sa.INTEGER(), nullable=True
        )

    # ### end Alembic commands ###
