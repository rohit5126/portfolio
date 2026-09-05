import os
import sys
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.db import get_connection

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')


def import_skills(cursor):
    path = os.path.join(DATA_DIR, 'skills.json')
    with open(path) as f:
        skills = json.load(f)

    cursor.execute('DELETE FROM skills')  # replace all on each import
    for s in skills:
        cursor.execute(
            'INSERT INTO skills (name, category, proficiency) VALUES (%s, %s, %s)',
            (s['name'], s.get('category'), s.get('proficiency', 0))
        )
    print(f'Imported {len(skills)} skills')


def import_experience(cursor):
    path = os.path.join(DATA_DIR, 'experience.json')
    with open(path) as f:
        experience = json.load(f)

    cursor.execute('DELETE FROM experience')  # replace all on each import
    for e in experience:
        cursor.execute(
            '''INSERT INTO experience (company, role, start_date, end_date, description)
               VALUES (%s, %s, %s, %s, %s)''',
            (e['company'], e['role'], e.get('start_date'), e.get('end_date'), e.get('description'))
        )
    print(f'Imported {len(experience)} experience entries')


def main():
    conn = get_connection()
    cursor = conn.cursor()

    import_skills(cursor)
    import_experience(cursor)

    conn.commit()
    cursor.close()
    conn.close()
    print('Done.')


if __name__ == '__main__':
    main()