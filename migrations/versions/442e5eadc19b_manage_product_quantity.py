"""manage product quantity

Revision ID: 442e5eadc19b
Revises: f512256a42d1
Create Date: 2023-07-26 22:31:11.419629

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "442e5eadc19b"
down_revision = "f512256a42d1"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("inbound_orders", schema=None) as batch_op:
        batch_op.alter_column(
            "delivery_agent_id", existing_type=sa.INTEGER(), nullable=True
        )
        batch_op.drop_column("quantity")

    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.add_column(sa.Column("inbound_order_id", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_product_quantity_group_inbound_order_id_inbound_orders"),
            "inbound_orders",
            ["inbound_order_id"],
            ["id"],
        )

    with op.batch_alter_table("warehouse_product", schema=None) as batch_op:
        batch_op.add_column(sa.Column("group_id", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_warehouse_product_group_id_groups"),
            "groups",
            ["group_id"],
            ["id"],
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("warehouse_product", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_warehouse_product_group_id_groups"), type_="foreignkey"
        )
        batch_op.drop_column("group_id")

    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_product_quantity_group_inbound_order_id_inbound_orders"),
            type_="foreignkey",
        )
        batch_op.drop_column("inbound_order_id")

    with op.batch_alter_table("inbound_orders", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("quantity", sa.INTEGER(), autoincrement=False, nullable=True)
        )
        batch_op.alter_column(
            "delivery_agent_id", existing_type=sa.INTEGER(), nullable=True
        )

    # ### end Alembic commands ###