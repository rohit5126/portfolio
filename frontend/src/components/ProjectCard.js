import React from 'react';

const LANGUAGE_COLORS = {
  Python: '#4B8BBE',
  JavaScript: '#E8C547',
  TypeScript: '#4FA8D8',
  HTML: '#E76F51',
  CSS: '#6B8AFD',
  HCL: '#8B6CF7',
  Shell: '#6FCF97',
};

function languageColor(language) {
  return LANGUAGE_COLORS[language] || '#8892A4';
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .5l2.28 4.62 5.1.74-3.69 3.6.87 5.08L8 12.1l-4.56 2.44.87-5.08L.62 5.86l5.1-.74L8 .5z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="4" cy="3" r="1.6" />
      <circle cx="12" cy="3" r="1.6" />
      <circle cx="8" cy="13" r="1.6" />
      <path d="M4 4.6V7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4.6M8 9v2.4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

function ProjectCard({ project }) {
  const color = languageColor(project.language);
  const topics = project.topics ? project.topics.split(',').filter(Boolean) : [];
  const hasImage = Boolean(project.image_url);

  return (
    <article className="project-card" style={{ '--lang-color': color }}>
      <div className="project-card-bar" />

      {hasImage && (
        <a
          className="project-card-image-link"
          href={project.github_url}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="project-card-image"
            src={project.image_url}
            alt={`${project.name} screenshot`}
            loading="lazy"
          />
          <div className="project-card-image-overlay">
            <span>View project →</span>
          </div>
        </a>
      )}


      <div className="project-card-body">
        <div className="project-card-head">
          <h3>{project.name}</h3>
          <span className="status-dot" title="Repository active" />
        </div>

        {project.description && <p className="project-desc">{project.description}</p>}

        <div className="project-meta">
          {project.language && (
            <span className="meta-item">
              <span className="lang-dot" />
              {project.language}
            </span>
          )}
          <span className="meta-item">
            <StarIcon /> {project.stars}
          </span>
          <span className="meta-item">
            <ForkIcon /> {project.forks}
          </span>
        </div>

        {topics.length > 0 && (
          <div className="project-topics">
            {topics.map((t) => (
              <span className="topic-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="project-links">
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
