from flask import Flask
from config import Config
from dotenv import load_dotenv
from extensions import db, cors, jwt

# Load environment variables
load_dotenv()

def create_app():
    """Application factory function"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    
    # Import models after db initialization
    with app.app_context():
        from models.user import User
        from models.profile import Profile, Skill, Experience, Education
        from models.post import Post, Comment, Like
        from models.message import Message
        from models.job import Job
        
        # Import and register blueprints
        from api.auth import auth_bp
        from api.profile import profile_bp
        from api.posts import posts_bp
        from api.feed import feed_bp
        from api.jobs import jobs_bp
        from api.messaging import messaging_bp
        from api.connections import connections_bp
        from api.skills import skills_bp
        from api.recommendations import recommendations_bp
        from api.featured import featured_bp
        
        app.register_blueprint(auth_bp)
        app.register_blueprint(profile_bp)
        app.register_blueprint(posts_bp)
        app.register_blueprint(feed_bp)
        app.register_blueprint(jobs_bp)
        app.register_blueprint(messaging_bp)
        app.register_blueprint(connections_bp)
        app.register_blueprint(skills_bp)
        app.register_blueprint(recommendations_bp)
        app.register_blueprint(featured_bp)
        
        @app.route('/')
        def index():
            return 'Prok API is running!'
        
        @app.route('/api/health', methods=['GET'])
        def health_check():
            """Health check endpoint"""
            return {'status': 'healthy', 'message': 'Prok API is running!'}
    
    return app

def setup_database():
    """Setup database tables"""
    app = create_app()
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

if __name__ == '__main__':
    # Setup database tables
    setup_database()
    
    # Create and run the app
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000) 