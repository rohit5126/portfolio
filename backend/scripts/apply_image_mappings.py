from config.db import get_connection

MAPPINGS = {
    'wanderlust': '/project-images/wanderlust.png',
    'AI-BankApp-DevOps': '/project-images/ai-bankapp-devops.png',
    'Devboard-CI-CD-secure-deployment': '/project-images/devboard-ci-cd.png',
}

def main():
    conn = get_connection()
    cursor = conn.cursor()
    for name, image_url in MAPPINGS.items():
        cursor.execute(
            'UPDATE projects SET image_url = %s WHERE name = %s',
            (image_url, name)
        )
    conn.commit()
    cursor.close()
    conn.close()
    print('Image mappings applied.')

if __name__ == '__main__':
    main()