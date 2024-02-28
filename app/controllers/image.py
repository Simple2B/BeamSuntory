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
        log(log.ERROR, "Cannot guess file type!")
        return "Cannot guess file type!"
    if not kind.mime.startswith("image"):
        log(log.ERROR, "Unsupported file type!")
        return "Unsupported file type!"

    file_path = f"{path}.{kind.extension}"
    image_path = f"{path}.{kind.extension}"
    image_extension = kind.extension

    try:
        with open(BASE_IMAGE_PATH / file_path, "wb") as f:
            f.write(image.read())

        if not image_model:
            log(log.INFO, "Image model not provided. Creating new image model.")
            image_name = path.split("/")[-1]
            image = db.session.scalar(
                m.Image.select().where(m.Image.name == image_name)
            )
            if image:
                log(log.INFO, "Image already exists. Deleting old image.")
                db.session.delete(image)
                try:
                    db.session.commit()
                    log(log.INFO, "Old image deleted.")
                except Exception as e:
                    log(log.ERROR, "Can't delete old image. Error: [%s]", e)
            return m.Image(
                name=image_name,
                path=image_path,
                extension=image_extension,
            )
    except PermissionError as e:
        log(log.ERROR, "Can't save product image. Error: [%s]", e)

    return image_path, image_extension
