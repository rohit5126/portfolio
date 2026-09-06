from flask import Blueprint, jsonify
from config.db import get_connection

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
def get_profile():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM profile LIMIT 1')
    row = cursor.fetchone()
    cursor.close(); conn.close()
    return jsonify(row or {})