from flask import Blueprint, request, jsonify
from extensions import db
from models.featured_item import FeaturedItem

featured_bp = Blueprint('featured', __name__)

@featured_bp.route('/api/featured/<int:user_id>', methods=['GET'])
def list_featured(user_id):
    items = FeaturedItem.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': i.id, 'type': i.type, 'title': i.title, 'url': i.url, 'description': i.description} for i in items])

@featured_bp.route('/api/featured', methods=['POST'])
def add_featured():
    data = request.json
    item = FeaturedItem(user_id=data['user_id'], type=data['type'], title=data['title'], url=data.get('url'), description=data.get('description'))
    db.session.add(item)
    db.session.commit()
    return jsonify({'message': 'Featured item added', 'id': item.id}) 