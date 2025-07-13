from extensions import db
from datetime import datetime
import json

class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    bio = db.Column(db.Text, default="")
    title = db.Column(db.String(200), default="")
    location = db.Column(db.String(200), default="")
    avatar_url = db.Column(db.String(500), default="")
    
    # JSON fields for complex data
    skills = db.Column(db.Text, default="[]")  # JSON string
    experience = db.Column(db.Text, default="[]")  # JSON string
    education = db.Column(db.Text, default="[]")  # JSON string
    social_links = db.Column(db.Text, default="{}")  # JSON string
    contact_info = db.Column(db.Text, default="{}")  # JSON string
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Profile {self.user_id}>'

    @property
    def skills_list(self):
        """Get skills as a list"""
        try:
            return json.loads(self.skills) if self.skills else []
        except:
            return []

    @skills_list.setter
    def skills_list(self, value):
        """Set skills as a list"""
        self.skills = json.dumps(value) if value else "[]"

    @property
    def experience_list(self):
        """Get experience as a list"""
        try:
            return json.loads(self.experience) if self.experience else []
        except:
            return []

    @experience_list.setter
    def experience_list(self, value):
        """Set experience as a list"""
        self.experience = json.dumps(value) if value else "[]"

    @property
    def education_list(self):
        """Get education as a list"""
        try:
            return json.loads(self.education) if self.education else []
        except:
            return []

    @education_list.setter
    def education_list(self, value):
        """Set education as a list"""
        self.education = json.dumps(value) if value else "[]"

    @property
    def social_links_dict(self):
        """Get social links as a dict"""
        try:
            return json.loads(self.social_links) if self.social_links else {}
        except:
            return {}

    @social_links_dict.setter
    def social_links_dict(self, value):
        """Set social links as a dict"""
        self.social_links = json.dumps(value) if value else "{}"

    @property
    def contact_info_dict(self):
        """Get contact info as a dict"""
        try:
            return json.loads(self.contact_info) if self.contact_info else {}
        except:
            return {}

    @contact_info_dict.setter
    def contact_info_dict(self, value):
        """Set contact info as a dict"""
        self.contact_info = json.dumps(value) if value else "{}"

    def to_dict(self):
        """Convert profile to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'title': self.title,
            'location': self.location,
            'avatar_url': self.avatar_url,
            'skills': self.skills_list,
            'experience': self.experience_list,
            'education': self.education_list,
            'social_links': self.social_links_dict,
            'contact_info': self.contact_info_dict,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

# Keep the old models for backward compatibility
class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    def __repr__(self):
        return f'<Skill {self.name}>'

class Experience(db.Model):
    __tablename__ = 'experiences'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    current = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Experience {self.title} at {self.company}>'

class Education(db.Model):
    __tablename__ = 'educations'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    school = db.Column(db.String(100), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    field = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    current = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Education {self.degree} in {self.field} at {self.school}>'

__all__ = ['Profile', 'Skill', 'Experience', 'Education']
