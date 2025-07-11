from flask import Blueprint, request, jsonify
from extensions import db
from models.message import Message

messaging_bp = Blueprint('messaging', __name__)

@messaging_bp.route('/api/messages', methods=['GET'])
def get_messages():
    """Get messages endpoint"""
    return jsonify({'message': 'Messages endpoint - to be implemented'}) 