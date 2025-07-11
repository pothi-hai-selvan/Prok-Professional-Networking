from flask import Blueprint, request, jsonify
from extensions import db
from models.recommendation import Recommendation
from models.user import User

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/api/recommendations/<int:user_id>', methods=['GET'])
def list_recommendations(user_id):
    recs = Recommendation.query.filter_by(to_user_id=user_id).all()
    return jsonify([{'id': r.id, 'from_user_id': r.from_user_id, 'text': r.text} for r in recs])

@recommendations_bp.route('/api/recommendations', methods=['POST'])
def give_recommendation():
    data = request.json
    rec = Recommendation(from_user_id=data['from_user_id'], to_user_id=data['to_user_id'], text=data['text'])
    db.session.add(rec)
    db.session.commit()
    return jsonify({'message': 'Recommendation given', 'id': rec.id}) 