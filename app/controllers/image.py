import base64
from io import BytesIO
from pathlib import Path
import os
from PIL import Image

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


def find_image(directory, image_name):
    """
    Search for an image by name within a specified directory.

    Parameters:
    directory (str): The directory to search within.
    image_name (str): The name of the image file to search for (e.g., 'example.jpg').

    Returns:
    str: The path of the found image file, or None if not found.
    """
    path = BASE_IMAGE_PATH / directory
    log(log.INFO, f"Searching for image {image_name} in directory {path}.")

    for root, _, files in os.walk(path):
        for file in files:
            if image_name in file:
                try:
                    # Try to open the file with PIL to ensure it's an image
                    with Image.open(os.path.join(root, file)):
                        return str(os.path.join(root, file))
                except IOError:
                    # If the file is not an image, continue searching
                    continue
    return None
