import uuid
import pytz
from datetime import datetime
from app import db

eastern = pytz.timezone("US/Eastern")

current_datetime = datetime.astimezone(eastern)

START_ORDER_NUMBER = 10000


def generate_uuid() -> str:
    return str(uuid.uuid4())


class ModelMixin(object):
    def save(self, commit=True):
        # Save this model to the database.
        db.session.add(self)
        if commit:
            db.session.commit()
        return self


# Add your own utility classes and functions here.
