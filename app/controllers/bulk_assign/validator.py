# flake8: noqa E501
import filetype
import pandas as pd
from werkzeug.datastructures import FileStorage
import sqlalchemy as sa
import app.models as m
import app.schema as s
from app.database import db
from app.logger import log


pattern = r"\(\d+\)"

ALLOW_FORMATS = [
    "xls",
    "xlsx",
    "xlsm",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]


def remove_quantity_from_group_name(group_name: str) -> str:
    return " ".join(group_name.split()[:-1])


def is_over_available_assigns_number(
    assign: s.AssignInfo, checked_quantity: int
) -> bool:
    available_quantity = (
        db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product.has(m.Product.SKU == assign.product_SKU),
                m.WarehouseProduct.group.has(
                    sa.func.TRIM(m.Group.name) == assign.group_name_from.strip()
                ),
            ),
        ).available_quantity
        or 0
    )
    log(log.INFO, f"Available quantity: {available_quantity}")

    return checked_quantity > available_quantity


def validate_bulk_assign_excel(file: FileStorage, result: s.ValidateBulkAssignResult):
    log(log.INFO, "Validating bulk assign excel")
    try:
        kind = filetype.guess(file)
        if not kind or kind.extension not in ALLOW_FORMATS:
            log(log.ERROR, "File must be in xlsx format")
            result.errors["file"] = ["File must be in xlsx format."]
            return []
        assigns = pd.read_excel(file)
        if assigns.empty:
            log(log.ERROR, "File is empty")
            result.errors["file"] = ["File is empty."]
            return []
        validated_assigns_info = []
        quantity_assigns_dict = {}
        log(log.INFO, f"Iterating over {len(assigns)} assigns")
        for i, row in assigns.iterrows():
            valid_assign_info = s.AssignInfo(
                product_SKU=row[s.BulkAssignFields.SKU.value],
                group_name_from=remove_quantity_from_group_name(
                    row[s.BulkAssignFields.GROUP_FROM.value]
                ),
                master_group_to_name=row[s.BulkAssignFields.MASTER_GROUP_TO.value],
                product_group_to_name=row[s.BulkAssignFields.PRODUCT_GROUP_TO.value],
                quantity=row[s.BulkAssignFields.QUANTITY.value],
            )
            if valid_assign_info.quantity < 1:
                log(log.ERROR, "Quantity must be positive")
                result.errors[f"Invalid row:{i}"] = ["Quantity must be positive"]
                return []
            #
            if (
                valid_assign_info.group_name_from
                == valid_assign_info.product_group_to_name
            ):
                log(log.ERROR, "Group from and product group to must be different")
                result.errors[f"Invalid row:{i}"] = [
                    "Group from and group to must be different"
                ]
                return []
            if valid_assign_info.quantity_assigns_key not in quantity_assigns_dict:
                quantity_assigns_dict[valid_assign_info.quantity_assigns_key] = (
                    valid_assign_info.quantity
                )
            else:
                quantity_assigns_dict[
                    valid_assign_info.quantity_assigns_key
                ] += valid_assign_info.quantity
            if is_over_available_assigns_number(
                valid_assign_info,
                quantity_assigns_dict[valid_assign_info.quantity_assigns_key],
            ):
                log(log.ERROR, "Invalid quantity")
                result.errors[f"Invalid row:{i}"] = ["Invalid quantity"]
                return []
            validated_assigns_info.append(valid_assign_info)
        return validated_assigns_info
    except Exception:
        log(log.ERROR, "File is not valid")
        result.errors["file"] = ["File is not valid. Try to upload another one."]
        return []
