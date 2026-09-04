from flask import Blueprint, request, jsonify
from config.db import get_connection

experience_bp = Blueprint('experience', __name__)

@experience_bp.route('/', methods=['GET'])
def get_experience():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM experience ORDER BY start_date DESC')
    rows = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify(rows)

@experience_bp.route('/', methods=['POST'])
def add_experience():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''INSERT INTO experience (company, role, start_date, end_date, description)
           VALUES (%s, %s, %s, %s, %s)''',
        (data.get('company'), data.get('role'), data.get('start_date'),
         data.get('end_date'), data.get('description'))
    )
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close(); conn.close()
    return jsonify({'id': new_id, **data}), 201