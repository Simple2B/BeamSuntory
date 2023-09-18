"""Add events report

Revision ID: fde3bec3d9b4
Revises: 4a921e625966
Create Date: 2023-09-15 17:17:37.240434

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "fde3bec3d9b4"
down_revision = "4a921e625966"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "report_events",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("type", sa.String(length=64), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("history", sa.String(length=128), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("fk_report_events_user_id_users")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_report_events")),
    )
    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.add_column(sa.Column("report_id", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            batch_op.f("fk_events_report_id_report_events"),
            "report_events",
            ["report_id"],
            ["id"],
        )
        batch_op.drop_column("date_reserve_from")
        batch_op.drop_column("date_reserve_to")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("events", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("date_reserve_to", sa.DATE(), autoincrement=False, nullable=True)
        )
        batch_op.add_column(
            sa.Column(
                "date_reserve_from", sa.DATE(), autoincrement=False, nullable=True
            )
        )
        batch_op.drop_constraint(
            batch_op.f("fk_events_report_id_report_events"), type_="foreignkey"
        )
        batch_op.drop_column("report_id")

    op.drop_table("report_events")
    # ### end Alembic commands ###
