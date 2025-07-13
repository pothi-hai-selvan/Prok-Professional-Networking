import os
from datetime import timedelta

DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL and DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

SQLALCHEMY_DATABASE_URI = DATABASE_URL or 'mysql://root:password@localhost/prok_db?charset=utf8mb4'

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # File Upload Configuration
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'static/uploads/')
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB max file size
    ALLOWED_EXTENSIONS = {
        'images': {'jpg', 'jpeg', 'png', 'gif', 'webp'},
        'videos': {'mp4', 'mov', 'avi', 'webm'}
    }
    
    # JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # CORS
    CORS_HEADERS = 'Content-Type'
    
    # Media URLs
    MEDIA_URL_PREFIX = '/uploads/' 