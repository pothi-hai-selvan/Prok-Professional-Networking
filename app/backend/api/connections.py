from flask import Blueprint, request, jsonify
from extensions import db
from models.connection import Connection
from models.user import User

connections_bp = Blueprint('connections', __name__)

@connections_bp.route('/api/connections', methods=['GET'])
def list_connections():
    # For demo: return all connections
    connections = Connection.query.all()
    return jsonify([{'id': c.id, 'user_id': c.user_id, 'connection_id': c.connection_id, 'status': c.status} for c in connections])

@connections_bp.route('/api/connections', methods=['POST'])
def send_connection():
    data = request.json
    new_conn = Connection(user_id=data['user_id'], connection_id=data['connection_id'], status='pending')
    db.session.add(new_conn)
    db.session.commit()
    return jsonify({'message': 'Connection request sent', 'id': new_conn.id})

@connections_bp.route('/api/connections/<int:conn_id>/accept', methods=['POST'])
def accept_connection(conn_id):
    conn = Connection.query.get_or_404(conn_id)
    conn.status = 'accepted'
    db.session.commit()
    return jsonify({'message': 'Connection accepted'}) 