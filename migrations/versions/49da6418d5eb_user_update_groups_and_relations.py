"""user update, groups and relations

Revision ID: 49da6418d5eb
Revises: 6a7135cb0174
Create Date: 2023-06-22 17:30:36.308736

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = "49da6418d5eb"
down_revision = "6a7135cb0174"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "master_groups",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_master_groups")),
        sa.UniqueConstraint("name", name=op.f("uq_master_groups_name")),
    )
    op.create_table(
        "groups",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("master_group_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["master_group_id"],
            ["master_groups.id"],
            name=op.f("fk_groups_master_group_id_master_groups"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_groups")),
        sa.UniqueConstraint("name", name=op.f("uq_groups_name")),
    )
    op.create_table(
        "user_group",
        sa.Column("left_id", sa.Integer(), nullable=False),
        sa.Column("right_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["left_id"], ["users.id"], name=op.f("fk_user_group_left_id_users")
        ),
        sa.ForeignKeyConstraint(
            ["right_id"], ["groups.id"], name=op.f("fk_user_group_right_id_groups")
        ),
        sa.PrimaryKeyConstraint("left_id", "right_id", name=op.f("pk_user_group")),
    )

    role = postgresql.ENUM("ADMIN", "MANAGER", "SALES_REP", name="userrole")
    role.create(op.get_bind())

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("full_name", sa.String(length=255), nullable=False)
        )
        batch_op.add_column(sa.Column("image", sa.String(length=255), nullable=False))
        batch_op.add_column(
            sa.Column(
                "role",
                sa.Enum("ADMIN", "MANAGER", "SALES_REP", name="userrole"),
                nullable=False,
            )
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("role")
        batch_op.drop_column("image")
        batch_op.drop_column("full_name")

    op.drop_table("user_group")
    op.drop_table("groups")
    op.drop_table("master_groups")
    # ### end Alembic commands ###
