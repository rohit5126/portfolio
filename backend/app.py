import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.projects import projects_bp
from routes.skills import skills_bp
from routes.experience import experience_bp
from routes.stats import stats_bp
from routes.profile import profile_bp
from routes.certifications import certifications_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(projects_bp, url_prefix='/api/projects')
app.register_blueprint(skills_bp, url_prefix='/api/skills')
app.register_blueprint(experience_bp, url_prefix='/api/experience')
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(profile_bp, url_prefix='/api/profile')
app.register_blueprint(certifications_bp, url_prefix='/api/certifications')

@app.route('/')
def index():
    return 'Backend API is running'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
