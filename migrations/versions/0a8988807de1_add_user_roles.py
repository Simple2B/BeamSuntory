"""add user_roles

Revision ID: 0a8988807de1
Revises: 46a7cf24d025
Create Date: 2023-10-04 16:13:21.682151

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0a8988807de1"
down_revision = "46a7cf24d025"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user_roles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("role_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["role_id"], ["roles.id"], name=op.f("fk_user_roles_role_id_roles")
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("fk_user_roles_user_id_users")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_user_roles")),
    )
    # op.drop_table('divisions')
    # with op.batch_alter_table('users', schema=None) as batch_op:
    #     batch_op.drop_constraint('fk_users_role_divisions', type_='foreignkey')
    #     batch_op.drop_column('role')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("role", sa.INTEGER(), autoincrement=False, nullable=False)
        )
        batch_op.create_foreign_key(
            "fk_users_role_divisions", "divisions", ["role"], ["id"]
        )

    op.create_table(
        "divisions",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column(
            "role_name", sa.VARCHAR(length=64), autoincrement=False, nullable=False
        ),
        sa.Column("activated", sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.Column(
            "created_at", postgresql.TIMESTAMP(), autoincrement=False, nullable=False
        ),
        sa.PrimaryKeyConstraint("id", name="pk_divisions"),
        sa.UniqueConstraint("role_name", name="uq_divisions_role_name"),
    )
    op.drop_table("user_roles")
    # ### end Alembic commands ###
