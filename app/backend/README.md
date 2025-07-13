# Backend Setup & Running

## How to Run

- Always run the backend from the project root using:

  python3 -m app.backend.main

- This ensures all absolute imports (e.g., from app.backend.models.user import User) work correctly.

## Package Structure

- The following directories must contain __init__.py files:
  - app/
  - app/backend/
  - app/backend/models/

## Example Import

from app.backend.models.user import User
from app.backend.extensions import db 