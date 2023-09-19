from pydantic import BaseModel, ConfigDict


class Pagination(BaseModel):
    """Pagination data"""

    page: int  # current page number
    total: int  # total items
    query: str | None  # query string
    per_page: int  # number items on the page
    skip: int  # number items on all previous pages
    pages: int  # total pages
    pages_for_links: list[int]  # number of links


class PaginationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    page: int
    pages: int
    per_page: int
    total: int
