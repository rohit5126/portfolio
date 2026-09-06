from flask import Blueprint, jsonify
from config.db import get_connection

certifications_bp = Blueprint('certifications', __name__)

@certifications_bp.route('/', methods=['GET'])
def get_certifications():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM certifications ORDER BY year DESC')
    rows = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify(rows)