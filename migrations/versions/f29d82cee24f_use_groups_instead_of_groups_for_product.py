"""use groups instead of groups-for-product

Revision ID: f29d82cee24f
Revises: 42985b8f3ed2
Create Date: 2023-08-07 22:59:17.597683

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "f29d82cee24f"
down_revision = "42985b8f3ed2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("assigns", schema=None) as batch_op:
        batch_op.drop_constraint(
            "fk_assigns_group_id_groups_for_product", type_="foreignkey"
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_assigns_group_id_groups"), "groups", ["group_id"], ["id"]
        )

    with op.batch_alter_table("product_group", schema=None) as batch_op:
        batch_op.drop_constraint(
            "fk_product_group_group_id_groups_for_product", type_="foreignkey"
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_product_group_group_id_groups"),
            "groups",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.drop_constraint(
            "fk_product_quantity_group_group_id_groups_for_product", type_="foreignkey"
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_product_quantity_group_group_id_groups"),
            "groups",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("request_share", schema=None) as batch_op:
        batch_op.drop_constraint(
            "fk_request_share_group_id_groups_for_product", type_="foreignkey"
        )
        batch_op.drop_constraint(
            "fk_request_share_from_group_id_groups_for_product", type_="foreignkey"
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_request_share_from_group_id_groups"),
            "groups",
            ["from_group_id"],
            ["id"],
        )
        batch_op.create_foreign_key(
            batch_op.f("fk_request_share_group_id_groups"),
            "groups",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("warehouse_product", schema=None) as batch_op:
        batch_op.drop_constraint(
            "fk_warehouse_product_group_id_groups_for_product", type_="foreignkey"
        )
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
        batch_op.create_foreign_key(
            "fk_warehouse_product_group_id_groups_for_product",
            "groups_for_product",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("request_share", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_request_share_group_id_groups"), type_="foreignkey"
        )
        batch_op.drop_constraint(
            batch_op.f("fk_request_share_from_group_id_groups"), type_="foreignkey"
        )
        batch_op.create_foreign_key(
            "fk_request_share_from_group_id_groups_for_product",
            "groups_for_product",
            ["from_group_id"],
            ["id"],
        )
        batch_op.create_foreign_key(
            "fk_request_share_group_id_groups_for_product",
            "groups_for_product",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("product_quantity_group", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_product_quantity_group_group_id_groups"), type_="foreignkey"
        )
        batch_op.create_foreign_key(
            "fk_product_quantity_group_group_id_groups_for_product",
            "groups_for_product",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("product_group", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_product_group_group_id_groups"), type_="foreignkey"
        )
        batch_op.create_foreign_key(
            "fk_product_group_group_id_groups_for_product",
            "groups_for_product",
            ["group_id"],
            ["id"],
        )

    with op.batch_alter_table("assigns", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_assigns_group_id_groups"), type_="foreignkey"
        )
        batch_op.create_foreign_key(
            "fk_assigns_group_id_groups_for_product",
            "groups_for_product",
            ["group_id"],
            ["id"],
        )

    # ### end Alembic commands ###