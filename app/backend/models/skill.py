from extensions import db

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    endorsements = db.relationship('Endorsement', backref='skill', lazy=True)

class Endorsement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    endorser_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 