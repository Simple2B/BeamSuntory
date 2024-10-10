from openpyxl.utils import get_column_letter


RELOAD_PAGE_SCRIPT = """
    <script>
        location.reload();
    </script>
    """


def create_metch(ref: str, sheet: str, length: int):
    letter = get_column_letter(length)
    return f"MATCH({ref},{sheet}!A1:{letter}1,0)-1"
