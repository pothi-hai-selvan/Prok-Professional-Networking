import os
from datetime import timedelta

class Config:
    # Flask app secret key
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev')

    # SQLAlchemy Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'mysql://prok_user:MyPass123@localhost/prok_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # Cross-Origin Resource Sharing (CORS)
    CORS_HEADERS = 'Content-Type'

