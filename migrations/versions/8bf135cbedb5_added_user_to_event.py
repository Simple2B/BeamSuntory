"""added user to event

Revision ID: 8bf135cbedb5
Revises: fa5a2d5129c0
Create Date: 2023-09-13 11:00:39.743214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "8bf135cbedb5"
down_revision = "fa5a2d5129c0"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.add_column(sa.Column("user_id", sa.Integer(), nullable=False))
        batch_op.create_foreign_key(
            batch_op.f("fk_events_user_id_users"), "users", ["user_id"], ["id"]
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("fk_events_user_id_users"), type_="foreignkey"
        )
        batch_op.drop_column("user_id")

    # ### end Alembic commands ###