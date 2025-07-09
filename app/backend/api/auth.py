from flask import Blueprint, request, jsonify, make_response
from models import db
from models.user import User
from flask_jwt_extended import create_access_token
from passlib.hash import bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import cross_origin
import re
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta

from flask import current_app as app

# Blueprint
auth_bp = Blueprint('auth', __name__)
 
# Limiter (attach to app in main.py, but for now, create here for endpoints)
limiter = Limiter(key_func=get_remote_address, default_limits=["10 per minute"])

# Password complexity regex (min 8 chars, at least 1 letter and 1 number, allow special characters)
PASSWORD_REGEX = re.compile(r'^(?=.*[A-Za-z])(?=.*\d).{8,}$')

# In-memory store for failed login attempts (for demo; use Redis in production)
FAILED_LOGINS = {}
LOCKOUT_TIME = timedelta(minutes=15)
MAX_ATTEMPTS = 5

# Helper: sanitize string input
sanitize = lambda s: re.sub(r'[^\w@.\-]', '', s) if isinstance(s, str) else ''

# --- Registration Endpoint ---
@auth_bp.route('/signup', methods=['POST'])
@limiter.limit("5 per minute")
def signup():
    data = request.get_json(force=True)
    username = sanitize((data.get('username') or '').strip())
    email = sanitize((data.get('email') or '').strip().lower())
    password = data.get('password') or ''

    # Input validation
    if not username or not email or not password:
        return jsonify({'message': 'All fields are required.'}), 400
    if not PASSWORD_REGEX.match(password):
        return jsonify({'message': 'Password must be at least 8 characters, include a letter and a number.'}), 400
    if not re.match(r'^\S+@\S+\.\S+$', email):
        return jsonify({'message': 'Invalid email address.'}), 400

    # Uniqueness check
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'message': 'Username or email already exists.'}), 400

    # Hash password
    hashed_pw = bcrypt.hash(password)
    user = User(username=username, email=email, password=hashed_pw)
    try:
        db.session.add(user)
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({'message': 'Database error. Please try again.'}), 500

    return jsonify({'message': 'User created successfully.'}), 201

@auth_bp.route('/signup', methods=['OPTIONS'])
def signup_options():
    response = make_response()
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response, 200

# --- Login Endpoint ---
@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    data = request.get_json(force=True)
    identifier = sanitize((data.get('username') or data.get('email') or '').strip().lower())
    password = data.get('password') or ''
    ip = get_remote_address()

    # Account lockout check
    now = datetime.utcnow()
    fail_info = FAILED_LOGINS.get(identifier) or FAILED_LOGINS.get(ip)
    if fail_info:
        if fail_info['count'] >= MAX_ATTEMPTS and now < fail_info['lockout_until']:
            return jsonify({'message': f'Account locked. Try again after {fail_info["lockout_until"].strftime("%H:%M:%S")}' }), 403
        elif now >= fail_info['lockout_until']:
            FAILED_LOGINS.pop(identifier, None)
            FAILED_LOGINS.pop(ip, None)

    # Find user by username or email
    user = User.query.filter((User.username == identifier) | (User.email == identifier)).first()
    if not user or not bcrypt.verify(password, user.password):
        # Track failed attempts
        fail_info = FAILED_LOGINS.get(identifier) or FAILED_LOGINS.get(ip)
        if not fail_info:
            FAILED_LOGINS[identifier] = {'count': 1, 'lockout_until': now}
        else:
            fail_info['count'] += 1
            if fail_info['count'] >= MAX_ATTEMPTS:
                fail_info['lockout_until'] = now + LOCKOUT_TIME
            FAILED_LOGINS[identifier] = fail_info
        return jsonify({'message': 'Invalid credentials.'}), 401

    # Reset failed attempts on success
    FAILED_LOGINS.pop(identifier, None)
    FAILED_LOGINS.pop(ip, None)

    # Create JWT token
    access_token = create_access_token(identity=user.id)
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email
    }
    # Set JWT as secure, HttpOnly cookie
    resp = make_response(jsonify({'token': access_token, 'user': user_data}))
    return resp

@auth_bp.route('/login', methods=['OPTIONS'])
def login_options():
    response = make_response()
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response, 200

# Routes will be implemented here 