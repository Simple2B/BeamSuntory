"""add _user_secret

Revision ID: a88b068a0988
Revises: 0069a74a3e5e
Create Date: 2024-06-18 08:36:57.633446

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "a88b068a0988"
down_revision = "0069a74a3e5e"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("_user_secret", sa.String(length=512), nullable=True)
        )


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("_user_secret")

    # ### end Alembic commands ###
