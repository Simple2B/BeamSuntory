import os
import pandas as pd
import sqlalchemy as sa
import app.models as m

from pydantic.dataclasses import dataclass
from pydantic import ValidationError


@dataclass
class StoreData:

    id: int
    name: str
    category_name: str
    contact_person: str
    email: str
    phone: str | int
    country: str
    region: str
    zip: int | str
    address: str
    city: str = ""


def add_new_store(fail_path: str, db):
    if not os.path.isfile(fail_path):
        print(f"File not exist in {fail_path}")
        return
    # invalid_data = []
    # csv_reader = csv.reader(fail_path)
    stores_sheet = pd.read_excel(fail_path)
    for i, row in stores_sheet.iterrows():
        try:
            store_item = StoreData(*row.to_list())  # type: ignore
        except ValidationError:
            print(f"Row {i} is invalid")
            # invalid_data.append(row.to_list())
            continue
        store_category = db.session.scalar(
            sa.select(m.StoreCategory).where(
                m.StoreCategory.name == store_item.category_name
            )
        )
        if not store_category:
            store_category = m.StoreCategory(name=store_item.category_name, active=True)
            store_category.save(False)

        store = db.session.scalar(
            sa.select(m.Store).where(m.Store.store_name == store_item.name)
        )
        if not store:
            store = m.Store(
                store_name=store_item.name,
                contact_person=store_item.contact_person,
                email=store_item.email,
                phone_numb=str(store_item.phone),
                country=store_item.country,
                region=store_item.region,
                city=store_item.city,
                address=store_item.address,
                zip=str(store_item.zip),
                active=True,
                store_category=store_category,
            )
            db.session.add(store)
    db.session.commit()

    # if invalid_data:
    #     invalid_df = pd.DataFrame(invalid_data, columns=stores_sheet.columns)
    #     invalid_file_path = os.path.splitext(fail_path)[0] + "_invalid.xlsx"
    #     invalid_df.to_excel(invalid_file_path, index=False)
    print("Finished adding stores")
