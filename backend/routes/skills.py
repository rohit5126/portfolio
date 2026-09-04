from flask import Blueprint, request, jsonify
from config.db import get_connection

skills_bp = Blueprint('skills', __name__)

@skills_bp.route('/', methods=['GET'])
def get_skills():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM skills ORDER BY category, proficiency DESC')
    rows = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify(rows)

@skills_bp.route('/', methods=['POST'])
def add_skill():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO skills (name, category, proficiency) VALUES (%s, %s, %s)',
        (data.get('name'), data.get('category'), data.get('proficiency', 0))
    )
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close(); conn.close()
    return jsonify({'id': new_id, **data}), 201