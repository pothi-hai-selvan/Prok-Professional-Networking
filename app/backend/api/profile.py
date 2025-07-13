from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import uuid
import json
from models.profile import Profile
from models.user import User
from extensions import db

profile_bp = Blueprint('profile', __name__)

# File upload configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_user_id_from_request():
    """Get user ID from JWT token or fallback to demo user"""
    try:
        # Try to get user ID from JWT token
        return get_jwt_identity()
    except:
        # Fallback to demo user for development
        demo_user = User.query.filter_by(email='john@example.com').first()
        if demo_user:
            return demo_user.id
        # If no demo user exists, create one
        demo_user = User(
            name='Demo User',
            email='john@example.com',
            password_hash='demo'
        )
        db.session.add(demo_user)
        db.session.commit()
        return demo_user.id

@profile_bp.route('/api/profile', methods=['GET'])
def get_profile():
    """Get user profile"""
    user_id = get_user_id_from_request()
    
    try:
        user = User.query.get_or_404(user_id)
        profile = Profile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            # Create default profile if it doesn't exist
            profile = Profile(user_id=user_id)
            db.session.add(profile)
            db.session.commit()
        
        profile_data = profile.to_dict()
        profile_data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        
        return jsonify(profile_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching profile: {str(e)}")
        return jsonify({'error': 'Failed to fetch profile'}), 500

@profile_bp.route('/api/profile', methods=['PUT'])
def update_profile():
    """Update user profile with optional image upload"""
    user_id = get_user_id_from_request()
    
    try:
        user = User.query.get_or_404(user_id)
        profile = Profile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            profile = Profile(user_id=user_id)
            db.session.add(profile)
        
        # Handle form data
        data = request.form.to_dict()
        
        # Update basic fields
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'bio' in data:
            profile.bio = data['bio']
        if 'title' in data:
            profile.title = data['title']
        if 'location' in data:
            profile.location = data['location']
        
        # Handle skills
        if 'skills' in data:
            try:
                skills_data = json.loads(data['skills']) if data['skills'] else []
                profile.skills_list = skills_data
            except:
                profile.skills_list = []
        
        # Handle experience
        if 'experience' in data:
            try:
                experience_data = json.loads(data['experience']) if data['experience'] else []
                profile.experience_list = experience_data
            except:
                profile.experience_list = []
        
        # Handle education
        if 'education' in data:
            try:
                education_data = json.loads(data['education']) if data['education'] else []
                profile.education_list = education_data
            except:
                profile.education_list = []
        
        # Handle social links
        if 'social_links' in data:
            try:
                social_data = json.loads(data['social_links']) if data['social_links'] else {}
                profile.social_links_dict = social_data
            except:
                profile.social_links_dict = {}
        
        # Handle contact info
        if 'contact_info' in data:
            try:
                contact_data = json.loads(data['contact_info']) if data['contact_info'] else {}
                profile.contact_info_dict = contact_data
            except:
                profile.contact_info_dict = {}
        
        # Handle image upload
        avatar_url = None
        if 'avatar' in request.files:
            file = request.files['avatar']
            if file and file.filename:
                # Validate file
                if not allowed_file(file.filename):
                    return jsonify({'error': 'Invalid file type. Allowed: PNG, JPG, JPEG, GIF, WebP'}), 400
                
                # Check file size
                file.seek(0, 2)
                file_size = file.tell()
                file.seek(0)
                
                if file_size > MAX_FILE_SIZE:
                    return jsonify({'error': f'File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB'}), 400
                
                # Generate unique filename
                file_ext = file.filename.rsplit('.', 1)[1].lower()
                unique_filename = f"avatar_{user_id}_{uuid.uuid4().hex}.{file_ext}"
                
                # Save file
                upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
                avatar_folder = os.path.join(upload_folder, 'avatars')
                os.makedirs(avatar_folder, exist_ok=True)
                
                filepath = os.path.join(avatar_folder, unique_filename)
                file.save(filepath)
                
                avatar_url = f"/uploads/avatars/{unique_filename}"
                
                # Delete old avatar if exists
                if profile.avatar_url:
                    try:
                        old_file_path = os.path.join(current_app.root_path, 'static', profile.avatar_url.lstrip('/'))
                        if os.path.exists(old_file_path):
                            os.remove(old_file_path)
                    except Exception as e:
                        current_app.logger.warning(f"Failed to delete old avatar: {str(e)}")
        
        if avatar_url:
            profile.avatar_url = avatar_url
        
        profile.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        # Return updated profile data
        profile_data = profile.to_dict()
        profile_data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        
        return jsonify(profile_data), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error updating profile: {str(e)}")
        return jsonify({'error': 'Failed to update profile'}), 500

@profile_bp.route('/uploads/avatars/<filename>')
def serve_avatar(filename):
    """Serve uploaded avatar files"""
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
    avatar_folder = os.path.join(upload_folder, 'avatars')
    return current_app.send_from_directory(avatar_folder, filename) 