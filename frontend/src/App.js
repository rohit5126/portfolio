import React, { useEffect, useMemo, useState } from 'react';
import { getProjects, logVisit } from './api';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import './App.css';


// Edit these to your real details
const CONFIG = {
  resumeUrl: '/resume.pdf',
  email: 'rohitrajput5126@gmail.com',
  github: 'https://github.com/rohit5126',
  linkedin: 'https://www.linkedin.com/in/rohit-5126-kumar/',
  phone: '+919310064361',
};

// Repos that shouldn't show up in the grid (your profile repo, private scratch work, etc.)
const EXCLUDED_REPOS = ['rohit5126', 'Private-project', 'portfolio','ansible-practice','devboard-kubernetes-kind-cluster',''];

function App() {
  const [projects, setProjects] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState('All');

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
    logVisit();
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((p) => !EXCLUDED_REPOS.includes(p.name)),
    [projects]
  );

  const languages = useMemo(() => {
    const set = new Set(visibleProjects.map((p) => p.language).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [visibleProjects]);

  const filteredProjects = useMemo(
    () =>
      activeLanguage === 'All'
        ? visibleProjects
        : visibleProjects.filter((p) => p.language === activeLanguage),
    [visibleProjects, activeLanguage]
  );

  const metrics = useMemo(
    () => ({
      repoCount: visibleProjects.length,
      languageCount: languages.length - 1,
      starCount: visibleProjects.reduce((sum, p) => sum + (p.stars || 0), 0),
    }),
    [visibleProjects, languages]
  );

  return (
    <div className="page">
      <Hero config={CONFIG} metrics={metrics} />
      <About />
      <Skills />
      <Experience />

      <section className="projects">
        <div className="projects-head">
          <h2 className="section-title">Projects</h2>
          <div className="filter-tabs">
            {languages.map((lang) => (
              <button
                key={lang}
                className={lang === activeLanguage ? 'filter-tab active' : 'filter-tab'}
                onClick={() => setActiveLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="empty-state">No projects match this filter yet.</p>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <a href={CONFIG.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`mailto:${CONFIG.email}`}>Email</a>
      </footer>
    </div>
  );
}

export default App;