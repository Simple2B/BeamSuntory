"""adjust add user, product

Revision ID: a919bd570a83
Revises: cd4f28bfe83f
Create Date: 2023-09-27 10:41:43.418772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "a919bd570a83"
down_revision = "cd4f28bfe83f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("adjusts", schema=None) as batch_op:
        batch_op.add_column(sa.Column("user_id", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_adjusts_user_id_users"), "users", ["user_id"], ["id"]
        )

    with op.batch_alter_table("adjusts_group_qty", schema=None) as batch_op:
        batch_op.add_column(sa.Column("product_id", sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column("quantity_after", sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column("quantity_before", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_adjusts_group_qty_product_id_products"),
            "products",
            ["product_id"],
            ["id"],
        )
        batch_op.drop_column("quantity")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("adjusts_group_qty", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("quantity", sa.INTEGER(), autoincrement=False, nullable=True)
        )
        batch_op.drop_constraint(
            batch_op.f("fk_adjusts_group_qty_product_id_products"), type_="foreignkey"
        )
        batch_op.drop_column("quantity_before")
        batch_op.drop_column("quantity_after")
        batch_op.drop_column("product_id")

    with op.batch_alter_table("adjusts", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_adjusts_user_id_users"), type_="foreignkey"
        )
        batch_op.drop_column("user_id")

    # ### end Alembic commands ###
