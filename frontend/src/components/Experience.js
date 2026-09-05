import React, { useEffect, useState } from 'react';
import { getExperience } from '../api';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    getExperience().then((res) => setExperience(res.data));
  }, []);

  if (experience.length === 0) return null;

  return (
    <section className="experience">
      <h2 className="section-title">Experience</h2>
      <div className="experience-list">
        {experience.map((e) => (
          <div className="experience-item" key={e.id}>
            <div className="experience-head">
              <h3 className="experience-role">{e.role}</h3>
              <span className="experience-dates">
                {formatDate(e.start_date)} — {formatDate(e.end_date)}
              </span>
            </div>
            <div className="experience-company">{e.company}</div>
            {e.description && (
              <ul className="experience-bullets">
                {e.description.split('\n').filter(Boolean).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;