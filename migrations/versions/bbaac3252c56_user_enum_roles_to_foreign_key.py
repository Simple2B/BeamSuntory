"""user enum roles to foreign key

Revision ID: bbaac3252c56
Revises: af50f6665f46
Create Date: 2023-08-14 16:55:36.331789

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "bbaac3252c56"
down_revision = "af50f6665f46"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("role", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_users_role_divisions"), "divisions", ["role"], ["id"]
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_users_role_divisions"), type_="foreignkey"
        )
        batch_op.drop_column("role")

    # ### end Alembic commands ###
