import base64
from io import BytesIO
from pathlib import Path
from PIL import Image as PilImage
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin


class Image(db.Model, ModelMixin):
    __tablename__ = "images"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        unique=True,
        nullable=False,
    )
    path: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        nullable=False,
    )
    extension: orm.Mapped[str] = orm.mapped_column(
        sa.String(32),
        nullable=False,
    )

    def get_base64(self):
        image_path = Path("app") / "static" / "img" / "product" / self.name
        if not image_path.is_file():
            image_path = Path("app") / "static" / "img" / "no_picture_default.png"
        original_image = PilImage.open(
            image_path,
        ).resize((200, 200))
        with BytesIO() as buffered:
            original_image.save(buffered, format="PNG")
            return base64.b64encode(buffered.getvalue())

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
