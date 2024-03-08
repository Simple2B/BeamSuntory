import base64
from io import BytesIO
from pathlib import Path

# from app import db
# from app import models as m
from app.logger import log


BASE_IMAGE_PATH = Path("app/static/img/")


def save_image(image: BytesIO, path: str) -> tuple[str, str]:
    """Save image to disk and return the path and extension."""
    log(log.INFO, "Saving image.")

    image_path = BASE_IMAGE_PATH / path

    with open(image_path, "wb") as f:
        read = image.read()
        f.write(read)
        image_string = base64.b64encode(read).decode()
    return str(image_path), image_string
