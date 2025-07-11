from flask import Blueprint, request, jsonify
from extensions import db
from models.post import Post

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/api/posts', methods=['GET'])
def get_posts():
    """Get posts endpoint"""
    return jsonify({'message': 'Posts endpoint - to be implemented'}) 