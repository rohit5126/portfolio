from flask import Blueprint, request, jsonify
from config.db import get_connection

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/', methods=['GET'])
def get_stats():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute('SELECT COUNT(*) AS total_projects, SUM(stars) AS total_stars FROM projects')
    project_stats = cursor.fetchone()

    cursor.execute('SELECT COUNT(DISTINCT language) AS total_languages FROM projects WHERE language != ""')
    lang_stats = cursor.fetchone()

    cursor.execute('SELECT COUNT(*) AS total_visits FROM site_visits')
    visit_stats = cursor.fetchone()

    cursor.close(); conn.close()
    return jsonify({**project_stats, **lang_stats, **visit_stats})

@stats_bp.route('/visit', methods=['POST'])
def log_visit():
    data = request.get_json() or {}
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent', '')
    page = data.get('page', '/')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO site_visits (ip_address, user_agent, page) VALUES (%s, %s, %s)',
        (ip, user_agent, page)
    )
    conn.commit()
    cursor.close(); conn.close()
    return jsonify({'message': 'Visit logged'}), 201