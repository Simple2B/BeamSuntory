"""user_group usage edit

Revision ID: c092bf2a51db
Revises: bb8964acf6a5
Create Date: 2023-06-29 12:16:22.705548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c092bf2a51db"
down_revision = "bb8964acf6a5"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_constraint("fk_users_group_id_groups", type_="foreignkey")
        batch_op.drop_column("group_id")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("group_id", sa.INTEGER(), autoincrement=False, nullable=True)
        )
        batch_op.create_foreign_key(
            "fk_users_group_id_groups", "groups", ["group_id"], ["id"]
        )

    # ### end Alembic commands ###
