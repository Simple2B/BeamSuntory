"""user role many to many

Revision ID: 46a7cf24d025
Revises: df475b67cfe5
Create Date: 2023-10-04 12:22:16.932259

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "46a7cf24d025"
down_revision = "df475b67cfe5"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "roles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("activated", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_roles")),
        sa.UniqueConstraint("name", name=op.f("uq_roles_name")),
    )
    # op.drop_table("divisions")
    # with op.batch_alter_table("users", schema=None) as batch_op:
    #     batch_op.drop_constraint("fk_users_role_divisions", type_="foreignkey")
    #     batch_op.drop_column("role")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("role", sa.INTEGER(), autoincrement=False, nullable=True)
        )
        batch_op.create_foreign_key(
            "fk_users_role_divisions", "divisions", ["role"], ["id"]
        )

    op.create_table(
        "divisions",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=True),
        sa.Column(
            "role_name", sa.VARCHAR(length=64), autoincrement=False, nullable=True
        ),
        sa.Column("activated", sa.BOOLEAN(), autoincrement=False, nullable=True),
        sa.Column(
            "created_at", postgresql.TIMESTAMP(), autoincrement=False, nullable=True
        ),
        sa.PrimaryKeyConstraint("id", name="pk_divisions"),
        sa.UniqueConstraint("role_name", name="uq_divisions_role_name"),
    )
    op.drop_table("roles")
    # ### end Alembic commands ###
