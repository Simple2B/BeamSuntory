from io import BytesIO
from pathlib import Path
import filetype

from app import db
from app import models as m
from app.logger import log


BASE_IMAGE_PATH = Path("app/static/img/")


def save_image(image: BytesIO, path: str, image_model: m.Image = None):
    """Save image to disk and return the image obj."""
    kind = filetype.guess(image)
    if kind is None:
        return "Cannot guess file type!"
    if not kind.mime.startswith("image"):
        return "Unsupported file type!"

    file_path = f"{path}.{kind.extension}"
    image_path = f"{path}.{kind.extension}"
    image_extension = kind.extension

    try:
        with open(BASE_IMAGE_PATH / file_path, "wb") as f:
            f.write(image.read())

        if not image_model:
            image_name = path.split("/")[-1]
            image = db.session.scalar(
                m.Image.select().where(m.Image.name == image_name)
            )
            if image:
                db.session.delete(image)
                db.session.commit()
            return m.Image(
                name=image_name,
                path=image_path,
                extension=image_extension,
            )
    except PermissionError as e:
        log(log.ERROR, "Can't save product image. Error: [%s]", e)

    return image_path, image_extension
