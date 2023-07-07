"""rest of the tables

Revision ID: 4e9a25462d18
Revises: 49da6418d5eb
Create Date: 2023-06-27 13:06:50.539026

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "4e9a25462d18"
down_revision = "49da6418d5eb"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "delivery_agents",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(length=64), nullable=False),
        sa.Column("last_name", sa.String(length=64), nullable=False),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("email", sa.String(length=64), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_delivery_agents")),
    )
    op.create_table(
        "product_categories",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("description", sa.String(length=258), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_product_categories")),
        sa.UniqueConstraint("name", name=op.f("uq_product_categories_name")),
    )
    op.create_table(
        "properties",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("type", sa.String(length=64), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("master_group_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["master_group_id"],
            ["master_groups.id"],
            name=op.f("fk_properties_master_group_id_master_groups"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_properties")),
        sa.UniqueConstraint("name", name=op.f("uq_properties_name")),
    )
    op.create_table(
        "bool_values",
        sa.Column("value", sa.Boolean(), nullable=False),
        sa.Column("group_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"], ["groups.id"], name=op.f("fk_bool_values_group_id_groups")
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            name=op.f("fk_bool_values_property_id_properties"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_bool_values")),
    )
    op.create_table(
        "date_values",
        sa.Column("value", sa.DateTime(), nullable=False),
        sa.Column("group_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"], ["groups.id"], name=op.f("fk_date_values_group_id_groups")
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            name=op.f("fk_date_values_property_id_properties"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_date_values")),
    )
    op.create_table(
        "float_values",
        sa.Column("value", sa.Float(), nullable=False),
        sa.Column("group_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"], ["groups.id"], name=op.f("fk_float_values_group_id_groups")
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            name=op.f("fk_float_values_property_id_properties"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_float_values")),
    )
    op.create_table(
        "int_values",
        sa.Column("value", sa.Integer(), nullable=False),
        sa.Column("group_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"], ["groups.id"], name=op.f("fk_int_values_group_id_groups")
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            name=op.f("fk_int_values_property_id_properties"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_int_values")),
    )
    op.create_table(
        "str_values",
        sa.Column("value", sa.String(length=64), nullable=False),
        sa.Column("group_id", sa.Integer(), nullable=False),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"], ["groups.id"], name=op.f("fk_str_values_group_id_groups")
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            name=op.f("fk_str_values_property_id_properties"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_str_values")),
        sa.UniqueConstraint("value", name=op.f("uq_str_values_value")),
    )
    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column(
            "product_type",
            sa.Enum("SIMPLE_PRODUCT", "VARIABLE_PRODUCT", name="producttype"),
            nullable=False,
        ),
        sa.Column("brand_id", sa.Integer(), nullable=False),
        sa.Column("sub_brand_id", sa.Integer(), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column("language_id", sa.Integer(), nullable=False),
        sa.Column("currency", sa.Enum("USD", "CAD", name="currency"), nullable=False),
        sa.Column("regular_price", sa.Float(), nullable=False),
        sa.Column("retail_price", sa.Float(), nullable=False),
        sa.Column("image", sa.String(length=64), nullable=False),
        sa.Column("description", sa.String(length=256), nullable=False),
        sa.Column("SKU", sa.String(length=64), nullable=False),
        sa.Column("low_stock_level", sa.Integer(), nullable=False),
        sa.Column(
            "stock_status",
            sa.Enum("IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", name="stockstatus"),
            nullable=False,
        ),
        sa.Column("shelf_life", sa.DateTime(), nullable=False),
        sa.Column("program_year", sa.Integer(), nullable=False),
        sa.Column(
            "premises",
            sa.Enum("ON_PREMISE", "OFF_PREMISE", name="premises"),
            nullable=False,
        ),
        sa.Column("package_qty", sa.Integer(), nullable=False),
        sa.Column("numb_of_items_per_case", sa.Integer(), nullable=False),
        sa.Column("numb_of_cases_per_outer_case", sa.Integer(), nullable=False),
        sa.Column("comments", sa.String(length=128), nullable=False),
        sa.Column("weight", sa.Float(), nullable=False),
        sa.Column("length", sa.Float(), nullable=False),
        sa.Column("width", sa.Float(), nullable=False),
        sa.Column("height", sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(
            ["brand_id"],
            ["str_values.id"],
            name=op.f("fk_products_brand_id_str_values"),
        ),
        sa.ForeignKeyConstraint(
            ["category_id"],
            ["product_categories.id"],
            name=op.f("fk_products_category_id_product_categories"),
        ),
        sa.ForeignKeyConstraint(
            ["language_id"],
            ["str_values.id"],
            name=op.f("fk_products_language_id_str_values"),
        ),
        sa.ForeignKeyConstraint(
            ["sub_brand_id"],
            ["str_values.id"],
            name=op.f("fk_products_sub_brand_id_str_values"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_products")),
    )
    op.create_table(
        "stores",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("store_category", sa.String(length=64), nullable=False),
        sa.Column("store_name", sa.String(length=64), nullable=False),
        sa.Column("contact_person", sa.String(length=128), nullable=False),
        sa.Column("email", sa.String(length=64), nullable=False),
        sa.Column("phone_numb", sa.String(length=64), nullable=False),
        sa.Column("city", sa.String(length=64), nullable=False),
        sa.Column("address", sa.String(length=64), nullable=False),
        sa.Column("zip", sa.String(length=64), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("country_id", sa.Integer(), nullable=False),
        sa.Column("region_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["country_id"],
            ["str_values.id"],
            name=op.f("fk_stores_country_id_str_values"),
        ),
        sa.ForeignKeyConstraint(
            ["region_id"],
            ["str_values.id"],
            name=op.f("fk_stores_region_id_str_values"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_stores")),
        sa.UniqueConstraint("store_category", name=op.f("uq_stores_store_category")),
        sa.UniqueConstraint("store_name", name=op.f("uq_stores_store_name")),
    )
    op.create_table(
        "suppliers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("email", sa.String(length=64), nullable=False),
        sa.Column("contact_numb", sa.String(length=64), nullable=False),
        sa.Column("city", sa.String(length=64), nullable=False),
        sa.Column("address", sa.String(length=64), nullable=False),
        sa.Column("zip", sa.String(length=64), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("country_id", sa.Integer(), nullable=False),
        sa.Column("region_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["country_id"],
            ["str_values.id"],
            name=op.f("fk_suppliers_country_id_str_values"),
        ),
        sa.ForeignKeyConstraint(
            ["region_id"],
            ["str_values.id"],
            name=op.f("fk_suppliers_region_id_str_values"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_suppliers")),
        sa.UniqueConstraint("name", name=op.f("uq_suppliers_name")),
    )
    op.create_table(
        "warehouses",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("phone_number", sa.String(length=64), nullable=False),
        sa.Column("city", sa.String(length=64), nullable=False),
        sa.Column("zip", sa.String(length=64), nullable=False),
        sa.Column("address", sa.String(length=64), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("manager_id", sa.Integer(), nullable=False),
        sa.Column("country_id", sa.Integer(), nullable=False),
        sa.Column("region_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["country_id"],
            ["str_values.id"],
            name=op.f("fk_warehouses_country_id_str_values"),
        ),
        sa.ForeignKeyConstraint(
            ["manager_id"], ["users.id"], name=op.f("fk_warehouses_manager_id_users")
        ),
        sa.ForeignKeyConstraint(
            ["region_id"],
            ["str_values.id"],
            name=op.f("fk_warehouses_region_id_str_values"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_warehouses")),
        sa.UniqueConstraint("name", name=op.f("uq_warehouses_name")),
    )
    op.create_table(
        "inbound_orders",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("order_id", sa.String(length=64), nullable=False),
        sa.Column("active_date", sa.DateTime(), nullable=False),
        sa.Column("active_time", sa.DateTime(), nullable=False),
        sa.Column("item_type", sa.String(length=64), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("supplier_id", sa.Integer(), nullable=False),
        sa.Column("delivery_agent_id", sa.Integer(), nullable=False),
        sa.Column("warehouse_id", sa.Integer(), nullable=False),
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["delivery_agent_id"],
            ["delivery_agents.id"],
            name=op.f("fk_inbound_orders_delivery_agent_id_delivery_agents"),
        ),
        sa.ForeignKeyConstraint(
            ["product_id"],
            ["products.id"],
            name=op.f("fk_inbound_orders_product_id_products"),
        ),
        sa.ForeignKeyConstraint(
            ["supplier_id"],
            ["suppliers.id"],
            name=op.f("fk_inbound_orders_supplier_id_suppliers"),
        ),
        sa.ForeignKeyConstraint(
            ["warehouse_id"],
            ["warehouses.id"],
            name=op.f("fk_inbound_orders_warehouse_id_warehouses"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_inbound_orders")),
        sa.UniqueConstraint("order_id", name=op.f("uq_inbound_orders_order_id")),
    )
    op.create_table(
        "ship_requests",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("order_numb", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=64), nullable=False),
        sa.Column("order_type", sa.String(length=128), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("supplier_id", sa.Integer(), nullable=False),
        sa.Column("store_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["store_id"], ["stores.id"], name=op.f("fk_ship_requests_store_id_stores")
        ),
        sa.ForeignKeyConstraint(
            ["supplier_id"],
            ["suppliers.id"],
            name=op.f("fk_ship_requests_supplier_id_suppliers"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_ship_requests")),
        sa.UniqueConstraint("order_numb", name=op.f("uq_ship_requests_order_numb")),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("ship_requests")
    op.drop_table("inbound_orders")
    op.drop_table("warehouses")
    op.drop_table("suppliers")
    op.drop_table("stores")
    op.drop_table("products")
    op.drop_table("str_values")
    op.drop_table("int_values")
    op.drop_table("float_values")
    op.drop_table("date_values")
    op.drop_table("bool_values")
    op.drop_table("properties")
    op.drop_table("product_categories")
    op.drop_table("delivery_agents")
    # ### end Alembic commands ###
