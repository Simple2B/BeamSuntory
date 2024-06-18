import uuid
from app.database import db
from cryptography.fernet import Fernet, InvalidToken

from config import APP_ENV, config
from app.logger import log

conf = config(APP_ENV)


START_ORDER_NUMBER = 10000
fernet = Fernet(conf.CRYPTOGRAPHY_KEY.encode())


def generate_uuid() -> str:
    return str(uuid.uuid4())


class ModelMixin(object):
    def save(self, commit=True):
        # Save this model to the database.
        db.session.add(self)
        if commit:
            db.session.commit()
        return self


def encrypt_data(data: str) -> str:
    token = fernet.encrypt(f"{data}".encode())
    return token.decode()


def decrypt_data(token: str):
    try:
        data = fernet.decrypt(token.encode())
    except (InvalidToken, TypeError) as e:
        log(log.ERROR, "Can't decrypt data: %s", e)
        return ""
    return data.decode()
