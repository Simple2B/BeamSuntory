from flask import request
import filetype
import os
import pandas as pd
import sqlalchemy as sa
import app.models as m

from pydantic import ValidationError, Field, BaseModel


ALLOW_FORMAT = [
    "xls",
    "xlsx",
    "xlsm",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]


class WhProduct(BaseModel):
    sku: str
    group: str
    qty: int = Field(ge=0)
    store_category: str = ""
    store_name: str


def validate_bulk_ship_exel():
    errors = dict()  # dict[str, list[str]]
    file = request.files.get("exel_file")
    if not file:
        errors["file"] = ["File is required."]
        return errors
    kind = filetype.guess(file)
    if not kind or kind.extension not in ALLOW_FORMAT:
        errors["file"] = ["File must be in xlsx format."]
        return errors

    product_sheets = pd.read_excel(file)

    if product_sheets.empty:
        errors["file"] = ["File is empty."]
        return errors

    for i, row in product_sheets.iterrows():
        try:
            wh_product = WhProduct(
                sku=row["SKU"],
                group=row["Group"],
                qty=row["Quantity"],
                store_category=row["Store Category"],
                store_name=row["Store name"],
            )
        except ValidationError as e:
            errors[f"Row {i}"] = [err["msg"] for err in e.errors()]
            continue
        except KeyError as e:
            errors[f"Row {i}"] = ["Invalid columns."]
            continue
        print(i, row)

    return errors
