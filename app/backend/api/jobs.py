from flask import Blueprint, request, jsonify
from extensions import db
from models.job import Job

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Get jobs endpoint"""
    return jsonify({'message': 'Jobs endpoint - to be implemented'}) 