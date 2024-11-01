# flake8: noqa E501
from typing import List
import filetype
import re
from pydantic import ValidationError
import pandas as pd
from werkzeug.datastructures import FileStorage
import sqlalchemy as sa
import app.models as m
import app.schema as s
from app.database import db

pattern = r"\(\d+\)"

ALLOW_FORMATS = [
    "xls",
    "xlsx",
    "xlsm",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]


def validate_bulk_ship_exel(
    file: FileStorage, result: s.ValidateBulkShipResult
) -> List[s.WhProduct]:
    kind = filetype.guess(file)
    bulk_ship_category = db.session.scalar(
        sa.select(m.StoreCategory).where(
            m.StoreCategory.name == s.DefultStoreCategory.BULK_SHIP.value
        )
    )
    if not bulk_ship_category:
        result.errors["file"] = ["Bulk ship category not found."]
        return []
    if not kind or kind.extension not in ALLOW_FORMATS:
        result.errors["file"] = ["File must be in xlsx format."]
        return []

    try:
        product_sheets = pd.read_excel(file)
    except Exception:
        result.errors["file"] = ["File is not valid. Try to upload another one."]
        return []

    if product_sheets.empty:
        result.errors["file"] = ["File is empty."]
        return []

    wh_products: List[s.WhProduct | None] = []
    start_idx = 2
    for i, row in product_sheets.iterrows():
        start_idx += i  # type: ignore
        wh_product = None
        try:
            group = re.sub(pattern, "", row["Group"]).strip()
            wh_product = s.WhProduct(
                sku=row["SKU"],
                group=group,
                qty=row["Quantity"],
                store_category=(
                    "" if pd.isna(row["Store Category"]) else row["Store Category"]
                ),
                store_name=row["Store name"],
            )
        except ValidationError as e:
            result.errors[f"Invalid row:{start_idx}"] = [
                err["msg"] for err in e.errors()
            ]
        except KeyError:
            result.errors[f"Invalid row:{start_idx}"] = ["Invalid columns."]

        wh_products.append(wh_product)

    for idx, prod in enumerate(wh_products, start=2):
        if not prod:
            continue
        store = db.session.scalar(
            sa.select(m.Store).where(m.Store.store_name == prod.store_name)
        )
        if not store:
            store = m.Store(
                store_name=prod.store_name,
                store_category_id=bulk_ship_category.id,
            )
            db.session.add(store)
            db.session.commit()  # we can escape this commit
            result.new_stores_ids.append(store.id)

        prod.store_id = store.id

        products = db.session.scalars(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product.has(m.Product.SKU == prod.sku),
                m.WarehouseProduct.group.has(
                    sa.func.TRIM(m.Group.name) == prod.group.strip()
                ),
            ),
        ).all()

        # we can have same wh product on different warehouses
        if not products:
            result.errors[f"Invalid data row:{idx}"] = [
                f"SKU: {prod.sku} not found in group: {prod.group}"
            ]
            continue

        # we can have same product on different warehouses
        product = products[0]

        total_qty = sum(
            [
                p.qty
                for p in wh_products
                if p and prod.sku == p.sku and prod.group == p.group
            ]
        )
        if total_qty > product.available_quantity:
            result.errors[f"Invalid data row:{idx}"] = [
                f"Not enough quantity for SKU: {prod.sku} in group:  {prod.group}, available: {product.available_quantity}"
            ]
            continue

        prod.store_category_id = store.store_category_id
        prod.group_id = product.group_id
        prod.product_id = product.product_id

    return [prod for prod in wh_products if prod]
