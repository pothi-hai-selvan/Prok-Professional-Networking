from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import uuid
from sqlalchemy import or_, and_, desc, asc
from models.post import Post
from models.user import User
from extensions import db

posts_bp = Blueprint('posts', __name__)

# Enhanced allowed extensions with size limits
ALLOWED_EXTENSIONS = {
    'images': {'jpg', 'jpeg', 'png', 'gif', 'webp'},
    'videos': {'mp4', 'mov', 'avi', 'webm'}
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def allowed_file(filename, file_type='all'):
    """Check if file extension is allowed"""
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    if file_type == 'all':
        return ext in ALLOWED_EXTENSIONS['images'] or ext in ALLOWED_EXTENSIONS['videos']
    return ext in ALLOWED_EXTENSIONS.get(file_type, set())

def get_file_type(filename):
    """Get file type (image/video) based on extension"""
    if '.' not in filename:
        return None
    ext = filename.rsplit('.', 1)[1].lower()
    if ext in ALLOWED_EXTENSIONS['images']:
        return 'image'
    elif ext in ALLOWED_EXTENSIONS['videos']:
        return 'video'
    return None

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

@posts_bp.route('/api/posts', methods=['POST'])
def create_post():
    """Create a new post with optional media"""
    user_id = get_user_id_from_request()
    
    # Validate content
    content = request.form.get('content', '').strip()
    if not content:
        return jsonify({'error': 'Post content is required'}), 400
    
    if len(content) > 5000:  # Limit post length
        return jsonify({'error': 'Post content too long (max 5000 characters)'}), 400
    
    media_url = None
    media_type = None
    
    # Handle media upload
    if 'media' in request.files:
        file = request.files['media']
        if file and file.filename:
            # Validate file
            if not allowed_file(file.filename):
                return jsonify({'error': 'Invalid file type. Allowed: images (jpg, png, gif, webp) and videos (mp4, mov, avi, webm)'}), 400
            
            # Check file size
            file.seek(0, 2)  # Seek to end
            file_size = file.tell()
            file.seek(0)  # Reset to beginning
            
            if file_size > MAX_FILE_SIZE:
                return jsonify({'error': f'File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB'}), 400
            
            # Generate unique filename
            file_ext = file.filename.rsplit('.', 1)[1].lower()
            unique_filename = f"{uuid.uuid4().hex}.{file_ext}"
            
            # Save file
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
            posts_folder = os.path.join(upload_folder, 'posts')
            os.makedirs(posts_folder, exist_ok=True)
            
            filepath = os.path.join(posts_folder, unique_filename)
            file.save(filepath)
            
            media_url = f"/uploads/posts/{unique_filename}"
            media_type = get_file_type(file.filename)
    
    # Create post
    try:
        post = Post(
            user_id=user_id,
            content=content,
            media_url=media_url,
            media_type=media_type
        )
        db.session.add(post)
        db.session.commit()
        
        # Get user info for response
        user = User.query.get(user_id)
        post_data = post.to_dict()
        post_data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        
        return jsonify(post_data), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error creating post: {str(e)}")
        return jsonify({'error': 'Failed to create post'}), 500

@posts_bp.route('/api/posts', methods=['GET'])
def get_posts():
    """Get all posts with advanced filtering, sorting, and pagination"""
    # Get query parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search', '').strip()
    category = request.args.get('category', '').strip()
    visibility = request.args.get('visibility', '').strip()
    tags = request.args.getlist('tags')
    sort_by = request.args.get('sort_by', 'created_at')
    sort_order = request.args.get('sort_order', 'desc')
    
    try:
        # Start with base query
        query = Post.query.join(User)
        
        # Apply search filter
        if search:
            search_filter = or_(
                Post.content.ilike(f'%{search}%'),
                User.name.ilike(f'%{search}%')
            )
            query = query.filter(search_filter)
        
        # Apply category filter (if implemented)
        if category:
            # For now, we'll filter by content containing the category
            # In a real app, you'd have a separate categories table
            query = query.filter(Post.content.ilike(f'%{category}%'))
        
        # Apply visibility filter (if implemented)
        if visibility:
            # For now, we'll skip this as it's not implemented in the Post model
            pass
        
        # Apply tags filter (if implemented)
        if tags:
            # For now, we'll filter by content containing the tags
            # In a real app, you'd have a separate tags table
            tag_filters = [Post.content.ilike(f'%{tag}%') for tag in tags]
            query = query.filter(or_(*tag_filters))
        
        # Apply sorting
        if sort_by == 'created_at':
            sort_column = Post.created_at
        elif sort_by == 'likes_count':
            # For now, we'll sort by created_at as likes_count is not implemented
            sort_column = Post.created_at
        elif sort_by == 'views_count':
            # For now, we'll sort by created_at as views_count is not implemented
            sort_column = Post.created_at
        else:
            sort_column = Post.created_at
        
        if sort_order == 'asc':
            query = query.order_by(asc(sort_column))
        else:
            query = query.order_by(desc(sort_column))
        
        # Execute paginated query
        posts = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        posts_data = []
        for post in posts.items:
            user = User.query.get(post.user_id)
            post_data = post.to_dict()
            post_data['user'] = {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
            posts_data.append(post_data)
        
        return jsonify({
            'posts': posts_data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': posts.total,
                'pages': posts.pages,
                'has_next': posts.has_next,
                'has_prev': posts.has_prev
            }
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching posts: {str(e)}")
        return jsonify({'error': 'Failed to fetch posts'}), 500

@posts_bp.route('/api/posts/categories', methods=['GET'])
def get_categories():
    """Get all available post categories"""
    try:
        # For now, return mock categories
        # In a real app, you'd query a categories table
        categories = [
            'Technology',
            'Business',
            'Design',
            'Marketing',
            'Development',
            'Productivity',
            'Career',
            'Innovation'
        ]
        
        return jsonify({
            'categories': categories
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching categories: {str(e)}")
        return jsonify({'error': 'Failed to fetch categories'}), 500

@posts_bp.route('/api/posts/popular-tags', methods=['GET'])
def get_popular_tags():
    """Get most popular tags"""
    try:
        # For now, return mock popular tags
        # In a real app, you'd query a tags table and count usage
        popular_tags = [
            'react',
            'javascript',
            'python',
            'design',
            'startup',
            'web-development',
            'mobile',
            'ai',
            'machine-learning',
            'blockchain'
        ]
        
        return jsonify({
            'tags': popular_tags
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching popular tags: {str(e)}")
        return jsonify({'error': 'Failed to fetch popular tags'}), 500

@posts_bp.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Get a specific post by ID"""
    try:
        post = Post.query.get_or_404(post_id)
        user = User.query.get(post.user_id)
        
        post_data = post.to_dict()
        post_data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        
        return jsonify(post_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Error fetching post {post_id}: {str(e)}")
        return jsonify({'error': 'Failed to fetch post'}), 500

@posts_bp.route('/uploads/posts/<filename>')
def serve_media(filename):
    """Serve uploaded media files"""
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
    posts_folder = os.path.join(upload_folder, 'posts')
    return send_from_directory(posts_folder, filename)

@posts_bp.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a post (only by the author)"""
    user_id = get_user_id_from_request()
    
    try:
        post = Post.query.get_or_404(post_id)
        
        # Check if user owns the post
        if post.user_id != user_id:
            return jsonify({'error': 'Unauthorized to delete this post'}), 403
        
        # Delete associated media file if exists
        if post.media_url:
            try:
                file_path = os.path.join(current_app.root_path, 'static', post.media_url.lstrip('/'))
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception as e:
                current_app.logger.warning(f"Failed to delete media file: {str(e)}")
        
        db.session.delete(post)
        db.session.commit()
        
        return jsonify({'message': 'Post deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error deleting post {post_id}: {str(e)}")
        return jsonify({'error': 'Failed to delete post'}), 500 