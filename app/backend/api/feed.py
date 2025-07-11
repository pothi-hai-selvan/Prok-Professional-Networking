from flask import Blueprint, request, jsonify
from extensions import db
from models.post import Post

feed_bp = Blueprint('feed', __name__)

@feed_bp.route('/api/feed', methods=['GET'])
def get_feed():
    """Get feed endpoint"""
    return jsonify({'message': 'Feed endpoint - to be implemented'}) 