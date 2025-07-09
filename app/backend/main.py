from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from config import Config
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import DB and Models
from models import db
from models.user import User
from models.profile import Profile, Skill, Experience, Education

# Import Blueprints
from api import auth_bp, profile_bp, posts_bp, feed_bp, jobs_bp, messaging_bp

# ✅ Initialize extensions without app
migrate = Migrate()
jwt = JWTManager()
limiter = Limiter(key_func=get_remote_address, default_limits=["100 per hour"])


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Allow credentials and specify the frontend origin
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    # ✅ Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)

    # ✅ Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(profile_bp, url_prefix='/api')
    app.register_blueprint(posts_bp, url_prefix='/api')
    app.register_blueprint(feed_bp, url_prefix='/api')
    app.register_blueprint(jobs_bp, url_prefix='/api')
    app.register_blueprint(messaging_bp, url_prefix='/api')

    return app


# ✅ App instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")
    app.run(debug=True)

