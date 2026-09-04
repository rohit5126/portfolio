"""
Fetches all public repos for a GitHub user and inserts/updates them in the
'projects' table. Run manually or on a schedule.

Usage:
    python scripts/import_github.py
"""
import os
import sys
import requests
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.db import get_connection

load_dotenv()

GITHUB_USERNAME = os.getenv('GITHUB_USERNAME')
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')  # optional, raises rate limit


def fetch_repos(username, token=None):
    repos = []
    page = 1
    headers = {'Authorization': f'token {token}'} if token else {}

    while True:
        url = f'https://api.github.com/users/{username}/repos'
        params = {'per_page': 100, 'page': page, 'sort': 'updated'}
        resp = requests.get(url, headers=headers, params=params)
        resp.raise_for_status()
        data = resp.json()
        if not data:
            break
        repos.extend(data)
        page += 1

    return repos


def upsert_project(cursor, repo):
    name = repo['name']
    description = repo.get('description') or ''
    github_url = repo['html_url']
    live_url = repo.get('homepage') or ''
    language = repo.get('language') or ''
    stars = repo.get('stargazers_count', 0)
    forks = repo.get('forks_count', 0)
    topics = ','.join(repo.get('topics', []))

    cursor.execute('SELECT id FROM projects WHERE github_url = %s', (github_url,))
    existing = cursor.fetchone()

    if existing:
        cursor.execute(
            '''UPDATE projects SET name=%s, description=%s, live_url=%s,
               language=%s, stars=%s, forks=%s, topics=%s WHERE github_url=%s''',
            (name, description, live_url, language, stars, forks, topics, github_url)
        )
    else:
        cursor.execute(
            '''INSERT INTO projects (name, description, github_url, live_url, language, stars, forks, topics)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
            (name, description, github_url, live_url, language, stars, forks, topics)
        )


def main():
    if not GITHUB_USERNAME:
        print('Set GITHUB_USERNAME in .env')
        return

    print(f'Fetching repos for {GITHUB_USERNAME}...')
    repos = fetch_repos(GITHUB_USERNAME, GITHUB_TOKEN)
    print(f'Found {len(repos)} repos')

    conn = get_connection()
    cursor = conn.cursor()

    for repo in repos:
        if repo.get('fork'):
            continue  # skip forked repos, remove this line to include them
        upsert_project(cursor, repo)

    conn.commit()
    cursor.close()
    conn.close()
    print('Done. Projects table updated.')


if __name__ == '__main__':
    main()
