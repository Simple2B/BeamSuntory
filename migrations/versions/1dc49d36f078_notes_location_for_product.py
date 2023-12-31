"""notes location for product

Revision ID: 1dc49d36f078
Revises: e81b0028c2a9
Create Date: 2023-09-21 09:37:24.148561

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1dc49d36f078"
down_revision = "e81b0028c2a9"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("assigns", schema=None) as batch_op:
        batch_op.alter_column(
            "from_group_id", existing_type=sa.INTEGER(), nullable=True
        )

    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.alter_column("report_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.add_column(sa.Column("notes_location", sa.Text(), nullable=True))

    with op.batch_alter_table("request_share", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.INTEGER(), nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("request_share", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.drop_column("notes_location")

    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.alter_column("report_id", existing_type=sa.INTEGER(), nullable=True)

    with op.batch_alter_table("assigns", schema=None) as batch_op:
        batch_op.alter_column(
            "from_group_id", existing_type=sa.INTEGER(), nullable=True
        )

    # ### end Alembic commands ###
