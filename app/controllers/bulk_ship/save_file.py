import os
import uuid
from werkzeug.datastructures import FileStorage

import filetype
from pathlib import Path
import app.schema as s

from app.logger import log

UPLOAD_FOLDER = "app/static/uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

BASE_FILE_PATH = Path(UPLOAD_FOLDER)
MAX_FILE_SIZE = 2 * 1024 * 1024  # 2 MB limit


def save_exel_file(file: FileStorage, result: s.ValidateBulkShipResult) -> Path:
    """Save file to disk and return the path and extension."""
    log(log.INFO, "Saving file.")
    kind = filetype.guess(file)

    if not kind:
        result.errors["File"] = ["File type is not supported."]
        return Path()

    if MAX_FILE_SIZE < file.content_length:
        result.errors["File"] = ["File is too large."]
        return Path()

    file_name = (
        f"{str(uuid.uuid4())}_{file.filename}"
        if file.filename
        else str(uuid.uuid4()) + "." + kind.extension
    )

    file_path = BASE_FILE_PATH / file_name

    try:
        file.save(file_path)
    finally:
        file.close()

    return Path("static/uploads") / file_name
