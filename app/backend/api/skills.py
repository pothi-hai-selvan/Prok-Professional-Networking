from flask import Blueprint, request, jsonify
from extensions import db
from models.skill import Skill, Endorsement
from models.user import User

skills_bp = Blueprint('skills', __name__)

@skills_bp.route('/api/skills/<int:user_id>', methods=['GET'])
def list_skills(user_id):
    skills = Skill.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': s.id, 'name': s.name, 'endorsements': len(s.endorsements)} for s in skills])

@skills_bp.route('/api/skills/<int:skill_id>/endorse', methods=['POST'])
def endorse_skill(skill_id):
    data = request.json
    endorsement = Endorsement(skill_id=skill_id, endorser_id=data['endorser_id'])
    db.session.add(endorsement)
    db.session.commit()
    return jsonify({'message': 'Skill endorsed'}) 