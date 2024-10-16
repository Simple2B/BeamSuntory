"""add from_warehouse_product_id

Revision ID: 28e2d7f74bc1
Revises: 8107ad66cb38
Create Date: 2024-05-16 15:52:21.924555

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "28e2d7f74bc1"
down_revision = "8107ad66cb38"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("carts", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("from_warehouse_product_id", sa.Integer(), nullable=True)
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_carts_from_warehouse_product_id_warehouse_product"),
            "warehouse_product",
            ["from_warehouse_product_id"],
            ["id"],
        )

    # ### end Alembic commands ###


# need to run this code after migration
# carts_and_w_p_ids = db.session.execute(
#         sa.select(m.Cart, m.WarehouseProduct.id)
#         .where(
#             m.WarehouseProduct.group_id == m.Cart.group_id,
#             m.WarehouseProduct.product_id == m.Cart.product_id,
#         )
#         .group_by(m.Cart.id, m.WarehouseProduct.id)
#     ).all()
# for cart, w_p_id in carts_and_w_p_ids:
#     cart.from_warehouse_product_id = w_p_id

# db.session.commit()


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("carts", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_carts_from_warehouse_product_id_warehouse_product"),
            type_="foreignkey",
        )
        batch_op.drop_column("from_warehouse_product_id")

    # ### end Alembic commands ###
