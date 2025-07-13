#!/usr/bin/env python3
"""
Database reset script for development.
This will drop all tables and recreate them with sample data.
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app, setup_database
from extensions import db
from models.user import User
from models.profile import Profile
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

def reset_database():
    """Reset the database with sample data"""
    with app.app_context():
        print("🗑️  Dropping all tables...")
        db.drop_all()
        
        print("🏗️  Creating tables...")
        db.create_all()
        
        # Create upload directories
        upload_folder = app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)
        os.makedirs(os.path.join(upload_folder, 'posts'), exist_ok=True)
        os.makedirs(os.path.join(upload_folder, 'avatars'), exist_ok=True)
        
        print("👥 Creating sample users...")
        
        # Create sample users
        user1 = User(
            name="John Doe",
            email="john@example.com",
            password_hash=generate_password_hash("password123")
        )
        
        user2 = User(
            name="Jane Smith",
            email="jane@example.com", 
            password_hash=generate_password_hash("password123")
        )
        
        user3 = User(
            name="Bob Johnson",
            email="bob@example.com",
            password_hash=generate_password_hash("password123")
        )
        
        db.session.add_all([user1, user2, user3])
        db.session.commit()
        
        print("📝 Creating sample posts...")
        
        # Create sample posts
        from models.post import Post
        
        posts = [
            Post(
                user_id=user1.id,
                content="Just finished an amazing project! 🚀\n\nExcited to share that we've successfully launched our new product. The team worked incredibly hard and the results are outstanding.\n\n#success #teamwork #productlaunch",
                created_at=datetime.utcnow() - timedelta(hours=2)
            ),
            Post(
                user_id=user2.id,
                content="Great networking event today! Met so many inspiring professionals in the tech industry. Looking forward to collaborating on future projects.\n\n#networking #tech #collaboration",
                created_at=datetime.utcnow() - timedelta(hours=4)
            ),
            Post(
                user_id=user3.id,
                content="Learning new skills is always exciting! Currently diving deep into machine learning and AI. The possibilities are endless.\n\n#learning #AI #machinelearning #growth",
                created_at=datetime.utcnow() - timedelta(hours=6)
            ),
            Post(
                user_id=user1.id,
                content="Team building day was a huge success! 🎉\n\nNothing brings a team together like solving challenges and having fun. Great memories made today.\n\n#teambuilding #culture #fun",
                created_at=datetime.utcnow() - timedelta(days=1)
            ),
            Post(
                user_id=user2.id,
                content="Just published a new article on professional development. Check it out if you're interested in career growth strategies!\n\n#professionaldevelopment #career #growth",
                created_at=datetime.utcnow() - timedelta(days=2)
            )
        ]
        
        db.session.add_all(posts)
        db.session.commit()
        
        print("✅ Database reset completed successfully!")
        print(f"📊 Created {len([user1, user2, user3])} users and {len(posts)} posts")
        print(f"📁 Created upload directories: {upload_folder}")
        print("\n🔑 Sample login credentials:")
        print("   Email: john@example.com, Password: password123")
        print("   Email: jane@example.com, Password: password123") 
        print("   Email: bob@example.com, Password: password123")

if __name__ == "__main__":
    reset_database() 