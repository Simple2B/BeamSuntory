import os
import pandas as pd
import sqlalchemy as sa
import app.models as m

from pydantic.dataclasses import dataclass
from pydantic import ValidationError


@dataclass
class ProductData:

    sku: str
    description: str


def update_product_descriptions(db):
    fail_path = "sku_des.xlsx"
    if not os.path.isfile(fail_path):
        print(f"File not exist in {fail_path}")
        return

    prodcut_sheets = pd.read_excel(fail_path)
    updated = 0
    not_found = 0
    for i, row in prodcut_sheets.iterrows():
        try:
            product_data = ProductData(*row.to_list())  # type: ignore
        except ValidationError:
            print(f"Row {i} is invalid")
            # invalid_data.append(row.to_list())
            continue
        product: m.Product | None = db.session.scalar(
            sa.select(m.Product).where(m.Product.SKU == product_data.sku)
        )
        if not product:
            not_found += 1
            print(f"Product with sku {product_data.sku} not found")
            continue

        product.description = product_data.description
        updated += 1
    else:
        print(f"All products updated, {updated} updated, {not_found} not found")
        db.session.commit()
