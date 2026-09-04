from flask import Blueprint, request, jsonify
from config.db import get_connection

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/', methods=['POST'])
def send_message():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not all([name, email, message]):
        return jsonify({'error': 'name, email and message are required'}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO messages (name, email, message) VALUES (%s, %s, %s)',
        (name, email, message)
    )
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close(); conn.close()
    return jsonify({'id': new_id, 'message': 'Message received'}), 201

@contact_bp.route('/', methods=['GET'])
def get_messages():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM messages ORDER BY created_at DESC')
    rows = cursor.fetchall()
    cursor.close(); conn.close()
    return jsonify(rows)