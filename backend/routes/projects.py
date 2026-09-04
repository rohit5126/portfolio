from flask import Blueprint, request, jsonify
from config.db import get_connection

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/', methods=['GET'])
def get_projects():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM projects ORDER BY stars DESC, updated_at DESC')
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows)

@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM projects WHERE id = %s', (project_id,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if not row:
        return jsonify({'error': 'Project not found'}), 404
    return jsonify(row)

@projects_bp.route('/', methods=['POST'])
def create_project():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''INSERT INTO projects (name, description, github_url, live_url, language, stars, forks, topics)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
        (data.get('name'), data.get('description'), data.get('github_url'),
         data.get('live_url'), data.get('language'), data.get('stars', 0),
         data.get('forks', 0), data.get('topics'))
    )
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'id': new_id, **data}), 201

@projects_bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''UPDATE projects SET name=%s, description=%s, github_url=%s, live_url=%s,
           language=%s, stars=%s, forks=%s, topics=%s WHERE id=%s''',
        (data.get('name'), data.get('description'), data.get('github_url'),
         data.get('live_url'), data.get('language'), data.get('stars', 0),
         data.get('forks', 0), data.get('topics'), project_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'id': project_id, **data})

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM projects WHERE id = %s', (project_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Project deleted'})
