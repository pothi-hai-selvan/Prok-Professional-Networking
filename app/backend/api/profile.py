import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from PIL import Image
from extensions import db
from models.user import User
from models.profile import Profile

profile_bp = Blueprint('profile', __name__)
 
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

# Helper
def allowed_file(filename):
    allowed = current_app.config.get('ALLOWED_EXTENSIONS', {'png', 'jpg', 'jpeg', 'gif'})
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed

@profile_bp.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    print('DEBUG: GET /api/profile called')
    user_id = get_jwt_identity()
    print(f'DEBUG: JWT user_id = {user_id}')
    try:
        profile = Profile.query.filter_by(user_id=user_id, deleted=False).first()
        if not profile:
            print('DEBUG: No profile found for user_id:', user_id)
            return jsonify({'error': 'Profile not found'}), 404
        print(f'DEBUG: Profile found: {profile.to_dict()}')
        return jsonify(profile.to_dict()), 200
    except Exception as e:
        print(f'ERROR in GET /api/profile: {e}')
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/api/profile', methods=['POST'])
@jwt_required()
def create_profile():
    print('DEBUG: POST /api/profile called')
    user_id = get_jwt_identity()
    print(f'DEBUG: JWT user_id = {user_id}')
    data = request.json
    print(f'DEBUG: Received data: {data}')
    if Profile.query.filter_by(user_id=user_id).first():
        print('DEBUG: Profile already exists')
        return jsonify({'error': 'Profile already exists'}), 400
    profile = Profile(
        user_id=user_id,
        full_name=data.get('full_name', ''),
        bio=data.get('bio', ''),
        location=data.get('location', ''),
        image_url=data.get('image_url', ''),
    )
    db.session.add(profile)
    db.session.commit()
    print(f'DEBUG: Created profile: {profile.to_dict()}')
    return jsonify(profile.to_dict()), 201

@profile_bp.route('/api/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    print('DEBUG: PUT /api/profile called')
    user_id = get_jwt_identity()
    print(f'DEBUG: JWT user_id = {user_id}')
    try:
        data = request.get_json(force=True, silent=True)
        print(f'DEBUG: Received data: {data}')
        if not data:
            print('DEBUG: No JSON body received')
            return jsonify({'error': 'No input data provided'}), 400
        if not data.get('full_name') or not data.get('full_name').strip():
            print('DEBUG: full_name is missing or empty')
            return jsonify({'error': 'Full Name is required'}), 422
        if not data.get('bio') or not data.get('bio').strip():
            print('DEBUG: bio is missing or empty')
            return jsonify({'error': 'Bio is required'}), 422
        profile = Profile.query.filter_by(user_id=user_id, deleted=False).first()
        if not profile:
            print('DEBUG: No profile found, creating new')
            profile = Profile(
                user_id=user_id,
                full_name=data.get('full_name', ''),
                bio=data.get('bio', ''),
                location=data.get('location', ''),
                image_url=data.get('image_url', ''),
                is_private=data.get('is_private', False)
            )
            db.session.add(profile)
        else:
            print('DEBUG: Updating existing profile')
            for field in ['full_name', 'bio', 'location', 'is_private']:
                if field in data:
                    setattr(profile, field, data[field])
        db.session.commit()
        print(f'DEBUG: Updated profile: {profile.to_dict()}')
        return jsonify(profile.to_dict()), 200
    except Exception as e:
        print(f'ERROR in PUT /api/profile: {e}')
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/api/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id, deleted=False).first()
    if not profile:
        return jsonify({'error': 'Profile not found'}), 404
    profile.deleted = True
    db.session.commit()
    return jsonify({'message': 'Profile deleted'}), 200

@profile_bp.route('/api/profile/image', methods=['POST'])
@jwt_required()
def upload_profile_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    if file:
        # Secure and unique filename
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{uuid.uuid4().hex}.{ext}"
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads/')
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, filename)
        # Save original image
        file.save(filepath)
        # Open and process image
        try:
            img = Image.open(filepath)
            # Convert to RGB if needed
            if img.mode != 'RGB':
                img = img.convert('RGB')
            # Resize (max 512x512)
            img.thumbnail((512, 512))
            # Compress and save as JPEG
            img.save(filepath, format='JPEG', quality=85)
            # Generate thumbnail (128x128)
            thumb_filename = f"thumb_{filename}"
            thumb_path = os.path.join(upload_folder, thumb_filename)
            img.thumbnail((128, 128))
            img.save(thumb_path, format='JPEG', quality=80)
        except Exception as e:
            os.remove(filepath)
            return jsonify({'error': f'Image processing failed: {str(e)}'}), 400
        # Update user profile
        user_id = get_jwt_identity()
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({'error': 'Profile not found'}), 404
        profile.image_url = f"/static/uploads/{filename}"
        db.session.commit()
        return jsonify({'image_url': profile.image_url}), 200
    return jsonify({'error': 'Unknown error'}), 400

@profile_bp.route('/api/profile/image', methods=['DELETE'])
@jwt_required()
def delete_profile_image():
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id, deleted=False).first()
    if not profile or not profile.image_url:
        return jsonify({'error': 'No image to delete'}), 404
    filepath = os.path.join(current_app.root_path, profile.image_url.lstrip('/'))
    if os.path.exists(filepath):
        os.remove(filepath)
    profile.image_url = ''
    db.session.commit()
    return jsonify({'message': 'Image deleted'}), 200 