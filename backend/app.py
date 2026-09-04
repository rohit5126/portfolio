import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.projects import projects_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(projects_bp, url_prefix='/api/projects')

@app.route('/')
def index():
    return 'Backend API is running'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
