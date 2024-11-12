from datetime import datetime

# Files that stores helper functions that have to do with date


def last_modified(data: dict) -> dict:
    """Helper function to add in the last modified date"""

    # Get the current date
    current_date = datetime.now().date()
    data["LastModified"] = formatted_date = current_date.strftime("%Y-%m-%d")
    return data