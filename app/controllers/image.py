from io import BytesIO
from pathlib import Path
import filetype

from app import models as m


BASE_IMAGE_PATH = Path("app/static/img/")


def save_image(image: BytesIO, path: str, image_model: m.Image = None):
    """Save image to disk and return the image obj."""
    kind = filetype.guess(image)
    if kind is None:
        return "Cannot guess file type!"
    if not kind.mime.startswith("image"):
        return "Unsupported file type!"

    file_path = f"{path}.{kind.extension}"

    # TODO: check if file exists. delete it if it does
    with open(BASE_IMAGE_PATH / file_path, "wb") as f:
        f.write(image.read())

    image_path = f"{path}.{kind.extension}"
    image_extension = kind.extension

    if not image_model:
        return m.Image(
            name=path.split("/")[-1],
            path=image_path,
            extension=image_extension,
        )

    return image_path, image_extension
