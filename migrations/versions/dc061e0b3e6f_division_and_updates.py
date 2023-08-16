"""division and updates

Revision ID: dc061e0b3e6f
Revises: f29d82cee24f
Create Date: 2023-08-11 10:54:01.696615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "dc061e0b3e6f"
down_revision = "f29d82cee24f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "divisions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("role_name", sa.String(length=64), nullable=False),
        sa.Column("type", sa.String(length=64), nullable=False),
        sa.Column("parent_role", sa.String(length=64), nullable=True),
        sa.Column("activated", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_divisions")),
        sa.UniqueConstraint("role_name", name=op.f("uq_divisions_role_name")),
    )

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("division", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_users_division_divisions"), "divisions", ["division"], ["id"]
        )

    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("warehouses", schema=None) as batch_op:
        batch_op.alter_column("manager_id", existing_type=sa.INTEGER(), nullable=False)

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_users_division_divisions"), type_="foreignkey"
        )
        batch_op.drop_column("division")

    op.drop_table("divisions")
    # ### end Alembic commands ###