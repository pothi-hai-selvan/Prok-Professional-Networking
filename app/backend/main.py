"""
How to run:
    python3 main.py

All imports should use relative paths since we're running from within the backend directory.
"""

from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv
from extensions import db
import os

# Load environment variables
load_dotenv()

# Import models
from models.user import User
from models.profile import Profile, Skill, Experience, Education
from models.post import Post

# Import blueprints
from api.auth import auth_bp
from api.profile import profile_bp
from api.posts import posts_bp

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173,https://your-frontend-url.onrender.com').split(',')

from flask_cors import CORS
CORS(app,
     origins=ALLOWED_ORIGINS,
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
     supports_credentials=True,
     max_age=3600)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(posts_bp)

# Serve uploaded files
@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    upload_folder = app.config['UPLOAD_FOLDER']
    return send_from_directory(upload_folder, filename)

def setup_database():
    """Setup database tables"""
    with app.app_context():
        # Create upload directory if it doesn't exist
        upload_folder = app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)
        os.makedirs(os.path.join(upload_folder, 'posts'), exist_ok=True)
        os.makedirs(os.path.join(upload_folder, 'avatars'), exist_ok=True)
        
        db.create_all()
        print("✅ Database tables created successfully!")
        print(f"✅ Upload folder created: {upload_folder}")
        print(f"✅ Posts folder created: {os.path.join(upload_folder, 'posts')}")
        print(f"✅ Avatars folder created: {os.path.join(upload_folder, 'avatars')}")

def create_app():
    """Application factory function"""
    return app

if __name__ == '__main__':
    setup_database()
    app.run(debug=True) 